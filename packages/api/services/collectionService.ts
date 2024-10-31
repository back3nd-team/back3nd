import { PrismaClient } from '@prisma/client'
import { checkTableExists, createCollectionInDB } from '../repositories/collectionRepository'
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

export async function getCollectionDetails(collectionId: string) {
  try {
    const collection = await prisma.back3nd_entity.findUnique({
      where: { id: collectionId },
      include: {
        back3nd_permission: {
          include: {
            role: true,
          },
        },
      },
    })
    if (!collection) {
      return { error: 'Collection not found', statusCode: 404 }
    }
    return { data: collection }
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
