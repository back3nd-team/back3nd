import { PrismaClient } from '@prisma/client'
import { isValidCollectionName } from '../utils/validateCollectionName'

const prisma = new PrismaClient()

/**
 * Service to get items from a specific collection.
 * @param collectionName The name of the collection
 * @returns Data from the collection or an error object
 */
export async function getItemsForCollection(collectionName: string) {
  if (!isValidCollectionName(collectionName)) {
    return { error: 'Invalid collection name', statusCode: 400 }
  }

  try {
    const data: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM ${collectionName}`)
    if (!data || data.length === 0) {
      return { data: [] }
    }

    return { data }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}

/**
 * Service to get fields from a specific collection.
 * @param collectionName The name of the collection
 * @returns Fields from the collection or an error object
 */
export async function getFieldsForCollection(collectionName: string) {
  if (!isValidCollectionName(collectionName)) {
    return { error: 'Invalid collection name', statusCode: 400 }
  }

  try {
    const fields: any[] = await prisma.$queryRawUnsafe(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = '${collectionName}'
    `)

    if (!fields || fields.length === 0) {
      return { data: [] }
    }

    return { data: fields }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}

export async function listCollectionsForUser(userId: string) {
  const userRoles = await prisma.back3nd_user_role.findMany({
    where: {
      user_id: userId,
    },
    select: {
      role_id: true,
    },
  })

  const roleIds = userRoles.map(role => role.role_id)

  const permissions = await prisma.back3nd_permission.findMany({
    where: {
      role_id: {
        in: roleIds,
      },
      can_read: true,
    },
    select: {
      table: {
        select: {
          name: true,
        },
      },
    },
  })
  return permissions.map(permission => permission.table.name)
}
