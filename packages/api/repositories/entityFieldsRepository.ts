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

  static async saveField(fieldData: any) {
    return await prisma.back3nd_entity_fields.create({
      data: fieldData,
    })
  }
}
