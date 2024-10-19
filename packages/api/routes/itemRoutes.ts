import { Hono } from 'hono'
import { getItems, listUserTables } from '../controllers/itemController'
import { checkPermissions } from '../middleware/checkPermissions'

const itemRoutes = new Hono()
itemRoutes.get('/tables', listUserTables)

itemRoutes.get('/:table', async (c) => {
  const tableName = c.req.param('table')

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

export default itemRoutes
