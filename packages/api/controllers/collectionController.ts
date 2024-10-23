import type { Context } from 'hono'
import { createCollection, deleteCollection, getCollectionDetails, listCollections, updateCollection } from '../services/collectionService'

export class CollectionController {
  static async list(c: Context) {
    const result = await listCollections()
    return c.json(result)
  }

  static async getDetails(c: Context) {
    const collectionName = c.req.param('collection')
    const result = await getCollectionDetails(collectionName)
    return c.json(result)
  }

  static async create(c: Context) {
    const data = await c.req.json()
    const result = await createCollection(data)
    return c.json(result)
  }

  static async update(c: Context) {
    // const collectionName = c.req.param('collection')
    // const data = await c.req.json()
    const result = await updateCollection()
    return c.json(result)
  }

  static async delete(c: Context) {
    const collectionName = c.req.param('collection')
    const result = await deleteCollection(collectionName)
    return c.json(result)
  }
}
