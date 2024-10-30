import type { back3nd_entity } from '@prisma/client'
import type { Context } from 'hono'
import { createCollection, deleteCollection, getCollectionDetails, getPermissions, listCollections, updateCollection } from '../services/collectionService'

export class CollectionController {
  static async list(c: Context) {
    const result = await listCollections()
    return c.json(result)
  }

  static async getDetails(c: Context) {
    const collectionId = c.req.param('collection')
    const result = await getCollectionDetails(collectionId)
    return c.json(result)
  }

  static async create(c: Context) {
    const data: back3nd_entity = await c.req.json()
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

  static async getPermissions(ctx: Context) {
    const collectionId = ctx.req.param('collection')
    const permissions = await getPermissions(collectionId)
    return ctx.json(permissions)
  }
}
