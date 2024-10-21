import type { Context } from 'hono'
import type { StatusCode } from 'hono/utils/http-status'
import { getFieldsForCollection, getItemsForCollection, listCollectionsForUser } from '../services/itemService'

/**
 * Controller to handle requests to /items/:collection
 * @param c Context object
 */
export async function getItems(c: Context) {
  const collectionName = c.req.param('collection')

  const result = await getItemsForCollection(collectionName)

  if (result.error) {
    return c.json({ error: result.error }, result.statusCode as StatusCode)
  }

  return c.json(result.data, 200)
}
/**
 * Controller to handle requests to /items/:collection/fields
 * @param c Context object
 */
export async function getCollectionFields(c: Context) {
  const collectionName = c.req.param('collection')

  const result = await getFieldsForCollection(collectionName)

  if (result.error) {
    return c.json({ error: result.error }, result.statusCode as StatusCode)
  }

  return c.json(result.data, 200)
}
export async function listUserCollections(c: Context) {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'User not authenticated' }, 401)
  }

  try {
    const collections = await listCollectionsForUser(user.id)
    if (!collections.length) {
      return c.json({ error: 'No collections found for user' }, 404)
    }
    return c.json({ collections })
  }
  catch (error: any) {
    console.error(`Error fetching collections: ${error.message}`)
    return c.json({ error: 'Failed to fetch collections', message: error.message }, 500)
  }
}
