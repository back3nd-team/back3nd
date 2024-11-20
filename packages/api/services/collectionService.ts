import { PrismaClient } from '@prisma/client'
import { checkTableExists, createCollectionInDB } from '../repositories/collectionRepository'
import { getColumns, getTable, getTables } from '../utils/informationSchemaUtils'
import { isValidCollectionName } from '../utils/validateCollectionName'
import { runDbPull } from './prismaService'

const prisma = new PrismaClient()

export async function listCollections() {
  try {
    const collections = await getTables()
    const systemCollections = collections.filter((collection: any) =>
      collection.startsWith('back3nd_') && collection !== '_prisma_migrations',
    )
    const userCollections = collections.filter((collection: any) =>
      !collection.startsWith('back3nd_') && collection !== '_prisma_migrations',
    )

    return { systemCollections, userCollections }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}

export async function getCollectionDetails(collectionName: string) {
  try {
    const collection = await getTable(collectionName)

    if (!collection) {
      return { error: 'Collection not found', statusCode: 404 }
    }

    const columns = await getColumns(collectionName)
    const detailedCollection = {
      name: collection,
      columns,
    }
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
    for (const role of roles) {
      if (role && typeof role === 'string') {
        const existingPermission = await prisma.back3nd_permission.findFirst({
          where: {
            role_id: role,
            collection: entityName,
          },
          select: { id: true },
        })
        if (existingPermission) {
          console.warn(`Permission already exists for role ${role} on collection ${entityName}`)
        }
        else {
          await prisma.back3nd_permission.create({
            data: {
              role_id: role,
              collection: entityName,
              can_create: true,
              can_read: true,
              can_update: false,
              can_delete: false,
            },
          })
        }
      }
    }
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

export async function getPermissions(collectionName: string) {
  let permissions = await prisma.back3nd_permission.findMany({
    where: {
      collection: collectionName,
    },
  })

  if (permissions.length === 0) {
    const defaultRoles = await prisma.back3nd_role.findMany({
      select: { id: true },
    })
    const roleIds = defaultRoles.map(role => role.id)
    try {
      await createEntityWithPermission(roleIds, collectionName)
    }
    catch (error: any) {
      if (error.code !== 'P2002') {
        throw error
      }
    }
    permissions = await prisma.back3nd_permission.findMany({
      where: {
        collection: collectionName,
      },
    })
  }

  return permissions
}

export async function createPermission(data: any, collection: string) {
  try {
    const existingPermission = await prisma.back3nd_permission.findFirst({
      where: {
        role_id: data.role_id,
        collection,
      },
    })

    if (existingPermission) {
      console.warn(`Permission already exists for role ${data.role_id} on collection ${collection}`)
      return existingPermission
    }

    const permission = await prisma.back3nd_permission.create({
      data: {
        role_id: data.role_id,
        collection,
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

export async function updatePermission(role_id: string, collection: string, can_create: boolean, can_read: boolean, can_update: boolean, can_delete: boolean) {
  try {
    const updatedPermission = await prisma.back3nd_permission.updateMany({
      where: {
        role_id,
        collection,
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

export async function deletePermission(role_id: string, collection: string) {
  try {
    const response = await prisma.back3nd_permission.deleteMany({
      where: {
        role_id,
        collection,
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
