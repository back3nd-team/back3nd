import type { Context } from 'hono'
import type { StatusCode } from 'hono/utils/http-status'
import { getItemsForTable } from '../services/itemService'

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
