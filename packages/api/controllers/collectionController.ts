import type { back3nd_entity } from '@prisma/client'
import type { Context } from 'hono'
import { createCollection, createPermission, deleteCollection, deletePermission, getCollectionDetails, getPermissions, listCollections, updateCollection, updatePermission } from '../services/collectionService'

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

  static async createPermission(ctx: Context) {
    try {
      const data = await ctx.req.json()
      const permissions = await createPermission(data)
      return ctx.json(permissions)
    }
    catch (error: any) {
      return ctx.json({ error: 'Internal Server Error', message: error.message }, 500)
    }
  }

  static async updatePermission(ctx: Context) {
    try {
      const role_id = ctx.req.param('role')
      const table_id = ctx.req.param('collection')
      const data = await ctx.req.json()
      const permissions = await updatePermission(role_id, table_id, data.can_create, data.can_read, data.can_update, data.can_delete)
      return ctx.json(permissions)
    }
    catch (error: any) {
      return ctx.json({ error: 'Internal Server Error', message: error.message }, 500)
    }
  }

  static async deletePermission(ctx: Context) {
    try {
      const { role_id, table_id } = await ctx.req.json()
      await deletePermission(role_id, table_id)
      return ctx.json({ message: 'Permission deleted successfully' })
    }
    catch (error: any) {
      return ctx.json({ error: 'Internal Server Error', message: error.message }, 500)
    }
  }
}
