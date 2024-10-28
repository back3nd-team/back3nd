import { PrismaClient } from '@prisma/client'

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
    try {
      const entityExists = await prisma.back3nd_entity.findUnique({
        where: { id: entityID },
      })

      if (!entityExists) {
        throw new Error(`Entity with ID ${entityID} does not exist.`)
      }

      return await prisma.back3nd_entity_fields.create({
        data: {
          ...fieldData,
          entity_id: entityID,
        },
      })
    }
    catch (error: any) {
      if (error.code === 'P2002') {
        if (error.meta?.target?.includes('entity_id') && error.meta?.target?.includes('columnName')) {
          const existingField = fieldData.columnName
          const targetEntity = entityID
          console.error(`Duplicate field name "${existingField}" in entity "${targetEntity}"`)
          return {
            status: 400,
            message: `Field with name "${existingField}" already exists in entity with ID "${targetEntity}". Please use a unique field name.`,
          }
        }
      }

      // Tratamento genérico para outros erros
      console.error('Error saving field:', error)
      throw new Error('Could not save field. Please try again.')
    }
  }
}
