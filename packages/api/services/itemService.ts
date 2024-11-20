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
 * Service to get items from a specific collection with filters.
 * @param collectionName The name of the collection
 * @param orderBy Field to order by
 * @param ascending Order direction
 * @param limit Limit of items
 * @param filter Filter object
 * @param count Column to count distinct items
 * @returns Data from the collection or an error object
 */
export async function getItemsForCollectionWithFilters(collectionName: string, orderBy?: string, ascending: boolean = true, limit?: number, filter?: Record<string, { _eq?: string }>) {
  if (!isValidCollectionName(collectionName)) {
    return { error: 'Invalid collection name', statusCode: 400 }
  }

  try {
    let query = `SELECT * FROM "${collectionName}"`
    const filterConditions: string[] = []

    if (filter) {
      for (const [key, value] of Object.entries(filter)) {
        if (value._eq) {
          filterConditions.push(`${key} = '${value._eq}'`)
        }
      }
    }

    if (filterConditions.length > 0) {
      query += ` WHERE ${filterConditions.join(' AND ')}`
    }

    if (orderBy) {
      query += ` ORDER BY "${orderBy}" ${ascending ? 'ASC' : 'DESC'}`
    }
    if (limit) {
      query += ` LIMIT ${limit}`
    }
    const data: any[] = await prisma.$queryRawUnsafe(query)
    if (!data || data.length === 0) {
      return { data: [] }
    }

    let countResult: number | null = null
    countResult = data.length

    return { data, count: countResult }
  }
  catch (e: any) {
    return { error: `Database error${e.message}`, statusCode: 500 }
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
 * Service to create an item in a specific collection.
 * @param collectionName The name of the collection
 * @param itemData The data of the item to create
 * @returns The created item or an error object
 */
export async function createItemInCollection(collectionName: string, itemData: any) {
  if (!isValidCollectionName(collectionName)) {
    return { error: 'Invalid collection name', statusCode: 400 }
  }

  try {
    const columns = Object.keys(itemData)
      .map(column => `"${column}"`)
      .join(', ')

    const values = Object.values(itemData)
      .map((value) => {
        if (value === null)
          return 'NULL'
        if (typeof value === 'string')
          return `'${value}'`
        if (typeof value === 'boolean')
          return value ? 'TRUE' : 'FALSE'
        if (Array.isArray(value)) {
          return `'{${value.map(v => `"${v}"`).join(',')}}'`
        }
        return value
      })
      .join(', ')

    const query = `INSERT INTO "${collectionName}" (${columns}) VALUES (${values})  RETURNING *`
    const createdItem = await prisma.$queryRawUnsafe(query)
    return { data: createdItem }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}

/**
 * Service to update an item in a specific collection.
 * @param collectionName The name of the collection
 * @param itemId The ID of the item to update
 * @param itemData The data of the item to update
 * @returns The updated item or an error object
 */
export async function updateItemInCollection(collectionName: string, itemId: string, itemData: any) {
  if (!isValidCollectionName(collectionName)) {
    return { error: 'Invalid collection name', statusCode: 400 }
  }

  try {
    const updates = Object.entries(itemData)
      .map(([key, value]) => {
        const column = `"${key}"`
        if (value === null)
          return `${column} = NULL`
        if (typeof value === 'string')
          return `${column} = '${value}'`
        if (typeof value === 'boolean')
          return `${column} = ${value ? 'TRUE' : 'FALSE'}`
        if (Array.isArray(value)) {
          return `${column} = '{${value.map(v => `"${v}"`).join(',')}}'`
        }
        return `${column} = ${value}`
      })
      .join(', ')

    const query = `UPDATE "${collectionName}" SET ${updates} WHERE "id" = '${itemId}' RETURNING *`

    const updatedItem = await prisma.$queryRawUnsafe(query)
    return { data: updatedItem }
  }
  catch (error) {
    console.error('Database error:', error)
    return { error: 'Database error', statusCode: 500 }
  }
}

/**
 * Service to delete an item from a specific collection.
 * @param collectionName The name of the collection
 * @param itemId The ID of the item to delete
 * @returns A success message or an error object
 */
export async function deleteItemFromCollection(collectionName: string, itemId: string) {
  if (!isValidCollectionName(collectionName)) {
    return { error: 'Invalid collection name', statusCode: 400 }
  }

  try {
    await prisma.$queryRawUnsafe(`DELETE FROM "${collectionName}" WHERE id = '${itemId}'`)
    return { message: 'Item deleted successfully' }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}

/**
 * Service to get an item by ID from a specific collection.
 * @param collectionName The name of the collection
 * @param itemId The ID of the item to fetch
 * @returns The item data or an error object
 */
export async function getItemByIdFromCollection(collectionName: string, itemId: string) {
  if (!isValidCollectionName(collectionName)) {
    return { error: 'Invalid collection name', statusCode: 400 }
  }

  try {
    const query = `SELECT * FROM "${collectionName}" WHERE id = '${itemId}'`
    const item: any[] = await prisma.$queryRawUnsafe(query)
    if (!item || item.length === 0) {
      return { error: 'Item not found', statusCode: 404 }
    }

    return { data: item[0] }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}
