import { Hono } from 'hono'
import { syncCollectionsWebhook } from '../services/collectionService'

const webhookRoutes = new Hono()

webhookRoutes.get('/sync', async (c) => {
  const result = await syncCollectionsWebhook()
  if (result.error) {
    return c.json(result, { status: result.statusCode })
  }
  return c.json(result)
})

export default webhookRoutes
