import { PrismaClient } from '@prisma/client'
import { isValidCollectionName } from '../utils/validateCollectionName'

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
    const collections: { table_name: string }[] = await prisma.$queryRawUnsafe(
      'SELECT * FROM information_schema.tables WHERE table_schema = \'public\'',
    )
    const systemCollections = collections.filter((collection: any) =>
      collection.table_name.startsWith('back3nd_') && collection.table_name !== '_prisma_migrations',
    )
    const userCollections = collections.filter((collection: any) =>
      !collection.table_name.startsWith('back3nd_') && collection.table_name !== '_prisma_migrations',
    )
    return { systemCollections, userCollections }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}

export async function getCollectionDetails(collectionName: string) {
  if (!isValidCollectionName(collectionName)) {
    return { error: 'Invalid collection name', statusCode: 400 }
  }
  try {
    const collection = await prisma.$queryRawUnsafe(`SELECT * FROM information_schema.columns WHERE table_name = '${collectionName}'`)
    return { data: collection }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}

export async function createCollection(data: any) {
  try {
    const { name, fields } = data
    const createTableQuery = `CREATE TABLE ${name} (${fields.map((field: any) => `${field.name} ${field.type}`).join(', ')})`
    await prisma.$executeRawUnsafe(createTableQuery)
    return { message: 'Collection created successfully' }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}

/**
 * Updates a collection in the database.
 *
 * @returns {Promise<{ message?: string, error?: string, statusCode?: number }>}
 * A promise that resolves to an object containing a success message or an error message with a status code.
 *
 * @TODO Implement collection update logic
 */
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
