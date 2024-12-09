import { Hono } from 'hono'
import { auth } from './auth'
import { protectedRoute } from './protectedRoute'
 

const app = new Hono()

app.all('/api/auth/*', (c) => auth.handler(c.req.raw))
app.route('/api', protectedRoute())
app.get('/', (c) => c.text('Back3nd API running!'))

export default {
  port: 3000,
  fetch: app.fetch,
}
