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
      SELECT column_name, data_type, is_nullable, column_default, character_maximum_length, numeric_precision, numeric_scale
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

/**
 * Service to get detailed information about a collection, including fields and permissions.
 * @param collectionName The name of the collection
 * @param userId The ID of the user
 * @returns Detailed information about the collection or an error object
 */
export async function getCollectionDetails(collectionName: string, userId: string) {
  if (!isValidCollectionName(collectionName)) {
    return { error: 'Invalid collection name', statusCode: 400 }
  }

  try {
    // Get fields for the collection
    const fieldsResult = await getFieldsForCollection(collectionName)
    if (fieldsResult.error) {
      return fieldsResult
    }

    const fields = fieldsResult.data

    // Get permissions for the user
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
        table: {
          name: collectionName,
        },
      },
      select: {
        can_create: true,
        can_read: true,
        can_update: true,
        can_delete: true,
      },
    })

    const collectionPermissions = permissions.reduce((acc, permission) => {
      acc.can_create = acc.can_create || permission.can_create
      acc.can_read = acc.can_read || permission.can_read
      acc.can_update = acc.can_update || permission.can_update
      acc.can_delete = acc.can_delete || permission.can_delete
      return acc
    }, { can_create: false, can_read: false, can_update: false, can_delete: false })

    // Get collection details
    const collection = await prisma.back3nd_entity.findUnique({
      where: { name: collectionName },
    })

    if (!collection) {
      return { error: 'Collection not found', statusCode: 404 }
    }

    // Format the response
    const response = {
      collection: collectionName,
      fields: fields?.map(field => ({
        collection: collectionName,
        field: field.column_name,
        type: field.data_type,
        meta: {
          collection: collectionName,
          field: field.column_name,
          readonly: field.is_nullable === 'NO',
          hidden: false,
          sort: null,
          width: 'full',
          translations: null,
          note: null,
        },
        schema: {
          name: field.column_name,
          table: collectionName,
          data_type: field.data_type,
          default_value: field.column_default,
          max_length: field.character_maximum_length,
          numeric_precision: field.numeric_precision,
          numeric_scale: field.numeric_scale,
          is_nullable: field.is_nullable === 'YES',
          is_unique: false,
          is_indexed: false,
          is_primary_key: false,
          has_auto_increment: false,
          foreign_key_column: null,
          foreign_key_table: null,
          comment: null,
        },
      })),
      permissions: collectionPermissions,
    }

    return { data: response }
  }
  catch (error) {
    console.error('Error fetching collection details:', error)
    return { error: 'Database error', statusCode: 500 }
  }
}
/**
 * Service to list collections that a user has access to, including permissions.
 * @param userId The ID of the user
 * @returns Collections with permissions or an error object
 */
export async function listCollectionsForUser(userId: string) {
  try {
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

    const collections = await Promise.all(
      permissions.map(async (permission) => {
        const collectionDetails = await getCollectionDetails(permission.table.name, userId)
        return collectionDetails.data
      }),
    )

    return { data: collections }
  }
  catch (error) {
    console.error('Error fetching collections for user:', error)
    return { error: 'Database error', statusCode: 500 }
  }
}
