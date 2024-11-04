import { PrismaClient } from '@prisma/client'
import { checkTableExists, createCollectionInDB } from '../repositories/collectionRepository'
import { mapFieldTypeToPostgreSQL } from '../utils/columnTypeMapper'
import { isValidCollectionName } from '../utils/validateCollectionName'
import { runDbPull } from './prismaService'

const prisma = new PrismaClient()

/**
 * Lists the collections (tables) in the database, separating them into system and user collections.
 *
 * This function queries the database to retrieve all tables in the `public` schema.
 * It then filters these tables into two groups:
 * - `systemCollections`: Tables that start with 'back3nd_' and are not '_prisma_migrations'.
 * - `userCollections`: Tables that do not start with 'back3nd_' and are not '_prisma_migrations'.
 *
 * @returns {Promise<{ systemCollections: { table_name: string }[], userCollections: { table_name: string }[] } | { error: string, statusCode: number }>}
 * An object containing two arrays: `systemCollections` and `userCollections`, or an error object with a message and status code.
 */
export async function listCollections() {
  try {
    const collections = await prisma.back3nd_entity.findMany({
      include: {
        back3nd_permission: {
          include: {
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    const systemCollections = collections.filter((collection: any) =>
      collection.name.startsWith('back3nd_') && collection.name !== '_prisma_migrations',
    )
    const userCollections = collections.filter((collection: any) =>
      !collection.name.startsWith('back3nd_') && collection.name !== '_prisma_migrations',
    )

    return { systemCollections, userCollections }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}

export async function syncEntityFieldsWithPostgres(entityName: string) {
  try {
    // Primeiro, buscar todos os campos registrados em back3nd_entity_fields
    const entity = await prisma.back3nd_entity.findUnique({
      where: { name: entityName },
      include: {
        back3nd_entity_fields: true,
      },
    })

    if (!entity) {
      console.error('Entity not found:', entityName)
      return
    }

    const entityFields = entity.back3nd_entity_fields

    // Executar queryRaw para pegar as colunas e o tipo da tabela no PostgreSQL
    const result = await prisma.$queryRaw<
      { column_name: string, data_type: string, character_maximum_length: number | null }[]
    >`SELECT column_name, data_type, character_maximum_length FROM information_schema.columns WHERE table_name = ${entityName}`

    const pgColumns = result.map(col => ({
      columnName: col.column_name,
      columnType: col.data_type,
      size: col.character_maximum_length,
    }))

    // Executar queryRaw para pegar informações sobre restrições de unicidade
    const uniqueConstraints = await prisma.$queryRaw<
      { column_name: string }[]
    >`
      SELECT kcu.column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name
      WHERE tc.table_name = ${entityName}
      AND tc.constraint_type = 'UNIQUE'
    `

    const uniqueColumns = uniqueConstraints.map(uc => uc.column_name)

    // Sincronizar as colunas: Inserir as que faltam em back3nd_entity_fields e remover as que não existem mais
    const fieldsToAdd = pgColumns.filter(
      col => !entityFields.some(field => field.columnName === col.columnName),
    )

    const fieldsToRemove = entityFields.filter(
      field => !pgColumns.some(col => col.columnName === field.columnName),
    )

    for (const field of fieldsToAdd) {
      try {
        // Mapear o tipo da coluna do PostgreSQL para o formato utilizado no back-end
        const mappedColumnType = mapFieldTypeToPostgreSQL(field.columnType, field.size)

        // Verificar se o campo é único
        const isUnique = uniqueColumns.includes(field.columnName)

        // Criar o campo no back3nd_entity_fields
        await prisma.back3nd_entity_fields.create({
          data: {
            columnName: field.columnName,
            columnType: mappedColumnType,
            entity_id: entity.id,
            isUnique,
          },
        })
      }
      catch (error) {
        console.error(`Error mapping field type for column ${field.columnName}:`, error)
      }
    }

    for (const field of fieldsToRemove) {
      await prisma.back3nd_entity_fields.delete({
        where: {
          id: field.id,
        },
      })
    }
  }
  catch (error) {
    console.error('Error syncing fields:', error)
  }
}
export async function getCollectionDetails(collectionId: string) {
  try {
    const collection = await prisma.back3nd_entity.findUnique({
      where: { id: collectionId },
    })

    if (!collection) {
      return { error: 'Collection not found', statusCode: 404 }
    }

    // Sincronizar campos antes de pegar os detalhes da coleção
    await syncEntityFieldsWithPostgres(collection.name)

    const detailedCollection = await prisma.back3nd_entity.findUnique({
      where: { id: collectionId },
      include: {
        back3nd_permission: {
          include: {
            role: true,
          },
        },
      },
    })
    if (!detailedCollection) {
      return { error: 'Collection not found', statusCode: 404 }
    }
    return { data: detailedCollection }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}
export async function createCollection(data: any) {
  const { collectionName, primaryKeyField, type, roles } = data

  if (!isValidCollectionName(collectionName)) {
    return { error: 'Invalid collection name', statusCode: 400 }
  }

  if (!primaryKeyField || typeof primaryKeyField !== 'string') {
    return { error: 'Invalid primary key field', statusCode: 400 }
  }

  const validTypes = ['INT', 'VARCHAR', 'UUID']
  if (!type || !validTypes.includes(type.toUpperCase())) {
    return { error: 'Invalid type', statusCode: 400 }
  }

  const tableExists = await checkTableExists(collectionName)
  if (tableExists) {
    return { error: 'Collection already exists', statusCode: 400 }
  }

  const createTableResult = await createCollectionInDB(collectionName, primaryKeyField, type)
  if (!createTableResult) {
    return { error: 'Failed to create collection', statusCode: 500 }
  }

  const permissionCreated = await createEntityWithPermission(roles, collectionName)
  if (!permissionCreated) {
    return { error: 'Failed to create permissions for the collection', statusCode: 500 }
  }

  const dbPullResult = await runDbPull()
  if (!dbPullResult.success) {
    return { error: 'Failed to synchronize schema', statusCode: 500 }
  }
  return { message: 'Collection created successfully' }
}

async function createEntityWithPermission(roles: string[], entityName: string) {
  try {
    const newEntity = await prisma.back3nd_entity.create({
      data: {
        name: entityName,
      },
    })
    for (const role of roles) {
      if (role && typeof role === 'string') {
        await prisma.back3nd_permission.create({
          data: {
            role_id: role,
            table_id: newEntity.id,
            can_create: true,
            can_read: true,
            can_update: false,
            can_delete: false,
          },
        })
      }
    }
    console.warn('Created entity with permission:', { newEntity, roles })
    return true
  }
  catch (error) {
    console.error('Error creating entity or permission:', error)
    return false
  }
  finally {
    await prisma.$disconnect()
  }
}

export async function updateCollection() {
  try {
    return { message: 'Collection updated successfully' }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}

export async function deleteCollection(collectionName: string) {
  try {
    await prisma.$executeRawUnsafe(`DROP TABLE ${collectionName}`)
    return { message: 'Collection deleted successfully' }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}

export async function getPermissions(collectionId: string) {
  return prisma.back3nd_permission.findMany({
    where: {
      table: {
        id: collectionId,
      },
    },
    include: {
      role: true,
      table: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  })
}
export async function createPermission(data: any) {
  try {
    const permission = await prisma.back3nd_permission.create({
      data: {
        role_id: data.role_id,
        table_id: data.table_id,
        can_create: data.can_create,
        can_read: data.can_read,
        can_update: data.can_update,
        can_delete: data.can_delete,
      },
    })
    return permission
  }
  catch (error: any) {
    throw new Error(`Failed to create permission: ${error.message}`)
  }
}
export async function updatePermission(role_id: string, table_id: string, can_create: boolean, can_read: boolean, can_update: boolean, can_delete: boolean) {
  try {
    const updatedPermission = await prisma.back3nd_permission.updateMany({
      where: {
        role_id,
        table_id,
      },
      data: {
        can_create,
        can_read,
        can_update,
        can_delete,
      },
    })
    return updatedPermission
  }
  catch (error: any) {
    throw new Error(`Failed to update permission: ${error.message}`)
  }
}
export async function deletePermission(role_id: string, table_id: string) {
  try {
    const response = await prisma.back3nd_permission.deleteMany({
      where: {
        role_id,
        table_id,
      },
    })
    if (response.count === 0) {
      throw new Error('Permission not found')
    }
    return { message: 'Permission deleted successfully' }
  }
  catch (error: any) {
    throw new Error(`Failed to delete permission: ${error.message}`)
  }
}
