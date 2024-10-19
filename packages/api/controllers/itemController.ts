import type { Context } from 'hono'
import type { StatusCode } from 'hono/utils/http-status'
import { getItemsForTable, listTablesForUser } from '../services/itemService'

/**
 * Controller to handle requests to /items/:table
 * @param c Context object
 */
export async function getItems(c: Context) {
  const tableName = c.req.param('table')

  const result = await getItemsForTable(tableName)

  if (result.error) {
    return c.json({ error: result.error }, result.statusCode as StatusCode)
  }

  // Aqui forçamos explicitamente o status 200 para garantir que o array vazio seja tratado corretamente
  return c.json(result.data, 200)
}
export async function listUserTables(c: Context) {
  const user = c.get('user') // Obter o usuário logado
  if (!user) {
    return c.json({ error: 'User not authenticated' }, 401)
  }

  try {
    const tables = await listTablesForUser(user.id)
    console.log('Tables ', tables)
    if (!tables.length) {
      return c.json({ error: 'No tables found for user' }, 404)
    }
    return c.json({ tables })
  }
  catch (error: any) {
    console.error(`Error fetching tables: ${error.message}`)
    return c.json({ error: 'Failed to fetch tables', message: error.message }, 500)
  }
}
