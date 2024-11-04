import { Hono } from 'hono'
import { createItem, deleteItem, getCollectionFields, getItems, listUserCollections, updateItem } from '../controllers/itemController'
import { checkPermissions } from '../middleware/checkPermissions'

const itemRoutes = new Hono()
itemRoutes.get('/collections', async (c) => {
  try {
    const permissionMiddleware = checkPermissions('collections', 'can_read')
    const permissionCheck = await permissionMiddleware(c, async () => {})

    if (permissionCheck) {
      return permissionCheck
    }

    return await listUserCollections(c)
  }
  catch (error: any) {
    console.error(`Error during permission check or listing collections: ${error.message}`)
    return c.json({ error: 'Failed to process request', message: error.message }, 500)
  }
})

itemRoutes.get('/:collection', async (c) => {
  const tableName = c.req.param('collection')

  try {
    const permissionMiddleware = checkPermissions(tableName, 'can_read')
    const permissionCheck = await permissionMiddleware(c, async () => {})

    if (permissionCheck) {
      return permissionCheck
    }

    return await getItems(c)
  }
  catch (error: any) {
    console.error(`Error during permission check or fetching items: ${error.message}`)
    return c.json({ error: 'Failed to process request', message: error.message }, 500)
  }
})
itemRoutes.get('/:collection/fields', async (c) => {
  const tableName = c.req.param('collection')

  try {
    const permissionMiddleware = checkPermissions(tableName, 'can_read')
    const permissionCheck = await permissionMiddleware(c, async () => {})

    if (permissionCheck) {
      return permissionCheck
    }

    return await getCollectionFields(c)
  }
  catch (error: any) {
    console.error(`Error during permission check or fetching collection fields: ${error.message}`)
    return c.json({ error: 'Failed to process request', message: error.message }, 500)
  }
})
itemRoutes.post('/:collection', async (c) => {
  const tableName = c.req.param('collection')

  try {
    const permissionMiddleware = checkPermissions(tableName, 'can_create')
    const permissionCheck = await permissionMiddleware(c, async () => {})

    if (permissionCheck) {
      return permissionCheck
    }

    return await createItem(c)
  }
  catch (error: any) {
    console.error(`Error during permission check or creating item: ${error.message}`)
    return c.json({ error: 'Failed to process request', message: error.message }, 500)
  }
})

itemRoutes.put('/:collection/:id', async (c) => {
  const tableName = c.req.param('collection')
  const itemId = c.req.param('id')

  try {
    const permissionMiddleware = checkPermissions(tableName, 'can_update')
    const permissionCheck = await permissionMiddleware(c, async () => {})

    if (permissionCheck) {
      return permissionCheck
    }

    return await updateItem(c, itemId)
  }
  catch (error: any) {
    console.error(`Error during permission check or updating item: ${error.message}`)
    return c.json({ error: 'Failed to process request', message: error.message }, 500)
  }
})

itemRoutes.delete('/:collection/:id', async (c) => {
  const tableName = c.req.param('collection')
  const itemId = c.req.param('id')

  try {
    const permissionMiddleware = checkPermissions(tableName, 'can_delete')
    const permissionCheck = await permissionMiddleware(c, async () => {})

    if (permissionCheck) {
      return permissionCheck
    }

    return await deleteItem(c, itemId)
  }
  catch (error: any) {
    console.error(`Error during permission check or deleting item: ${error.message}`)
    return c.json({ error: 'Failed to process request', message: error.message }, 500)
  }
})

export default itemRoutes
