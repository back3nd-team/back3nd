import { Hono } from 'hono'
import { getItems } from '../controllers/itemController'
import { checkPermissions } from '../middleware/checkPermissions'

const itemRoutes = new Hono()

itemRoutes.get('/:table', async (c) => {
  const tableName = c.req.param('table')

  // Verificação de permissões
  try {
    const permissionMiddleware = checkPermissions(tableName, 'can_read')

    // Não chamar o next() diretamente, apenas execute o middleware
    const permissionCheck = await permissionMiddleware(c, async () => {})

    // Se as permissões falharem, `permissionCheck` será interrompido
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
