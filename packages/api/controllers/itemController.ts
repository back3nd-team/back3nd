import type { Context } from 'hono'
import type { StatusCode } from 'hono/utils/http-status'
import { createItemInCollection, deleteItemFromCollection, getFieldsForCollection, getItemByIdFromCollection, getItemsForCollection, getItemsForCollectionWithFilters, updateItemInCollection } from '../services/itemService'

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

/**
 * Controller to handle requests to get an item by ID from a collection
 * @param c Context object
 * @param itemId The ID of the item to fetch
 */
export async function getItemById(c: Context, itemId: string) {
  const collectionName = c.req.param('collection')

  const result = await getItemByIdFromCollection(collectionName, itemId)
  if (result.error) {
    return c.json({ error: result.error }, result.statusCode as StatusCode)
  }

  return c.json(result.data, 200)
}

/**
 * Controller to handle requests to /items/:collection with filters
 * @param c Context object
 * @param orderBy Field to order by
 * @param ascending Order direction
 * @param limit Limit of items
 * @param filter Filter object
 */
export async function getItemsWithFilters(c: Context, orderBy?: string, ascending: boolean = true, limit?: number, filter?: any) {
  const collectionName = c.req.param('collection')

  const result = await getItemsForCollectionWithFilters(collectionName, orderBy, ascending, limit, filter)
  if (result.error) {
    return c.json({ error: result.error }, result.statusCode as StatusCode)
  }

  return c.json(result, 200)
}
