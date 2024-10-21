import { Hono } from 'hono'
import { getCollectionFields, getItems, listUserCollections } from '../controllers/itemController'
import { checkPermissions } from '../middleware/checkPermissions'

const itemRoutes = new Hono()
itemRoutes.get('/collections', listUserCollections)

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

export default itemRoutes
