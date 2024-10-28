import type { Context } from 'hono'
import { EntityFieldsService } from '../services/entityFieldsService'

export class EntityFieldsController {
  static async list(c: Context) {
    try {
      const { entityID } = c.req.param()
      const fields = await EntityFieldsService.getFields(entityID)
      return c.json(fields)
    }
    catch {
      return c.json({ error: 'Yikes! We hit a snag while fetching those entity fields. Give it another go in a bit!' }, 500)
    }
  }

  static async create(c: Context) {
    try {
      const fieldData = await c.req.json()
      const field = await EntityFieldsService.addField(fieldData)
      return c.json(field, 201)
    }
    catch {
      return c.json({ error: 'Yikes! We hit a snag while fetching those entity fields. Give it another go in a bit!' }, 500)
    }
  }
}
