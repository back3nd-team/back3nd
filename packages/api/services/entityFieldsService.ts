import { EntityFieldsRepository } from '../repositories/entityFieldsRepository'

export class EntityFieldsService {
  static async getFields(entityID: string) {
    return await EntityFieldsRepository.getAllFields(entityID)
  }

  static async addField(entityID: string, fieldData: any) {
    const { columnName, columnType, isUnique = false, size = null, defaultValue = null } = fieldData

    const tableName = await EntityFieldsRepository.getEntityTableName(entityID)
    if (!tableName) {
      throw new Error(`Entity with ID ${entityID} not found.`)
    }

    const tableExists = await EntityFieldsRepository.checkTableExists(tableName)
    if (!tableExists) {
      throw new Error(`Table ${tableName} does not exist.`)
    }

    const columnExistsInDB = await EntityFieldsRepository.checkColumnExists(tableName, columnName)
    if (columnExistsInDB) {
      throw new Error(`Column ${columnName} already exists in table ${tableName}.`)
    }

    const fieldExistsInEntityFields = await EntityFieldsRepository.checkFieldInBack3ndEntityFields(entityID, columnName)
    if (fieldExistsInEntityFields) {
      throw new Error(`Field ${columnName} is already registered in back3nd_entity_fields for entity with ID ${entityID}.`)
    }

    // Logar antes de chamar a função de adicionar coluna
    console.log('Preparing to add field with params:', {
      tableName,
      columnName,
      columnType,
      isUnique,
      size,
      defaultValue,
    })

    try {
      const responseAdd = await EntityFieldsRepository.addFieldToTable(tableName, columnName, columnType, isUnique, size, defaultValue)
      console.log('responseAdd:', responseAdd)

      if (responseAdd) {
        const savedField = await EntityFieldsRepository.saveField(entityID, fieldData)
        return savedField
      }

      return null
    }
    catch (error: any) {
      console.error('Error adding field to table:', error)
      throw new Error(`Failed to add field: ${error.message}`)
    }
  }
}
