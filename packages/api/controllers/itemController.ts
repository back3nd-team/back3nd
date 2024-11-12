import type { Context } from 'hono'
import type { StatusCode } from 'hono/utils/http-status'
import { createItemInCollection, deleteItemFromCollection, getFieldsForCollection, getItemsForCollection, listCollectionsForUser, updateItemInCollection } from '../services/itemService'

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
/**
 * Controller to handle requests to list collections that a user has access to
 * @param c Context object
 */
export async function listUserCollections(c: Context) {
  const user = c.get('user')
  if (!user) {
    return c.json({ error: 'User not authenticated' }, 401)
  }

  try {
    const result = await listCollectionsForUser(user.id)
    if (result.error) {
      return c.json({ error: result.error }, result.statusCode as StatusCode)
    }

    if (!result.data || !result.data.length) {
      return c.json({ error: 'No collections found for user' }, 404)
    }

    return c.json({ collections: result.data })
  }
  catch (error: any) {
    console.error(`Error fetching collections: ${error.message}`)
    return c.json({ error: 'Failed to fetch collections', message: error.message }, 500)
  }
}
/**
 * Controller to handle requests to create an item in a collection
 * @param c Context object
 */
export async function createItem(c: Context) {
  const collectionName = c.req.param('collection')
  const itemData = await c.req.json()

  const result = await createItemInCollection(collectionName, itemData)

  if (result.error) {
    return c.json({ error: result.error }, result.statusCode as StatusCode)
  }

  const data = (result.data as Array<Record<string, unknown>>)[0] // any data from table
  return c.json(data, 201)
}
/**
 * Controller to handle requests to update an item in a collection
 * @param c Context object
 * @param itemId The ID of the item to update
 */
export async function updateItem(c: Context, itemId: string) {
  const collectionName = c.req.param('collection')
  const itemData = await c.req.json()

  const result = await updateItemInCollection(collectionName, itemId, itemData)

  if (result.error) {
    return c.json({ error: result.error }, result.statusCode as StatusCode)
  }
  const data = (result.data as Array<Record<string, unknown>>)[0] // any data from table
  return c.json(data, 200)
}

/**
 * Controller to handle requests to delete an item from a collection
 * @param c Context object
 * @param itemId The ID of the item to delete
 */
export async function deleteItem(c: Context, itemId: string) {
  const collectionName = c.req.param('collection')

  const result = await deleteItemFromCollection(collectionName, itemId)

  if (result.error) {
    return c.json({ error: result.error }, result.statusCode as StatusCode)
  }

  return c.json({ message: 'Item deleted successfully' }, 200)
}
