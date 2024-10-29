import { PrismaClient } from '@prisma/client'
import { getDefaultValueClause, mapFieldTypeToPostgreSQL } from '../utils/columnTypeMapper'

const prisma = new PrismaClient()

export class EntityFieldsRepository {
  static async getAllFields(entityId: string) {
    return await prisma.back3nd_entity_fields.findMany({
      where: {
        entity_id: entityId,
      },
    })
  }

  static async saveField(entityID: string, fieldData: any) {
    return await prisma.back3nd_entity_fields.create({
      data: {
        ...fieldData,
        entity_id: entityID,
      },
    })
  }

  static async getEntityTableName(entityId: string): Promise<string | null> {
    const entity = await prisma.back3nd_entity.findUnique({
      where: { id: entityId },
    })

    return entity?.name || null
  }

  static async checkTableExists(tableName: string): Promise<boolean> {
    try {
      const result = await prisma.$queryRawUnsafe<any[]>(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = '${tableName}'
      ) as exists
      `)
      return result[0]?.exists || false
    }
    catch (error: any) {
      throw new Error(`Failed to check if table ${tableName} exists: ${error.message}`)
    }
  }

  static async checkColumnExists(tableName: string, columnName: string): Promise<boolean> {
    try {
      const result = await prisma.$queryRawUnsafe<any[]>(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = '${tableName}'
        AND column_name = '${columnName}'
      ) as exists
      `)
      return result[0]?.exists || false
    }
    catch (error: any) {
      throw new Error(`Failed to check if column ${columnName} exists in table ${tableName}: ${error.message}`)
    }
  }

  static async checkFieldInBack3ndEntityFields(entityId: string, fieldName: string): Promise<boolean> {
    const existingField = await prisma.back3nd_entity_fields.findFirst({
      where: {
        entity_id: entityId,
        columnName: fieldName,
      },
    })

    return !!existingField
  }

  static async addFieldToTable(
    tableName: string,
    fieldName: string,
    fieldType: string,
    isUnique: boolean,
    size?: number | null,
    defaultValue?: string | null,
  ): Promise<void | string> {
    try {
      const postgresFieldType = mapFieldTypeToPostgreSQL(fieldType, size)

      const defaultValueClause = getDefaultValueClause(fieldType, defaultValue)
      console.log('defaultValueClause:', defaultValueClause)

      const uniqueClause = isUnique ? 'UNIQUE' : ''

      const alterTableQuery = `
        ALTER TABLE ${tableName}
        ADD COLUMN ${fieldName} ${postgresFieldType} ${uniqueClause} ${defaultValueClause}
      `
      console.log('alterTableQuery:', alterTableQuery)

      const queryResponse = await prisma.$executeRawUnsafe(alterTableQuery)
      console.log('Query response:', queryResponse)
      return `Column ${fieldName} added to ${tableName}`
    }
    catch (error: any) {
      console.error('Error in addFieldToTable:', error)
      throw new Error(`Failed to add column ${fieldName} to table ${tableName}: ${error.message}`)
    }
  }
}
