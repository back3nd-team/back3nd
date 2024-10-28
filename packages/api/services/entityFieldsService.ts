import { EntityFieldsRepository } from '../repositories/entityFieldsRepository'

export class EntityFieldsService {
  static async getFields(entityID: string) {
    return await EntityFieldsRepository.getAllFields(entityID)
  }

  static async addField(fieldData: any) {
    return await EntityFieldsRepository.saveField(fieldData)
  }
}
