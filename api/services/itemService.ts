import { PrismaClient } from '@prisma/client'
import { isValidTableName } from '../utils/validateTableName'

const prisma = new PrismaClient()

/**
 * Service to get items from a specific table.
 * @param tableName The name of the table
 * @returns Data from the table or an error object
 */
export async function getItemsForTable(tableName: string) {
  if (!isValidTableName(tableName)) {
    return { error: 'Invalid table name', statusCode: 400 }
  }

  try {
    const data: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM ${tableName}`)

    if (!data || data.length === 0) {
      return { data: [] }
    }

    return { data }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}
