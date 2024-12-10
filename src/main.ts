import { Hono } from 'hono'
import { auth } from './auth'
import authMiddleware from './middleware/AuthMiddleware'
import { protectedRoute } from './protectedRoute'
import PostgrestAuth from './routes/PostgrestAuth'

const app = new Hono({ strict: false })

app.use('*', authMiddleware)

app.all('/auth/*', c => auth.handler(c.req.raw))
app.route('/files', protectedRoute())
app.route('/postgrest', PostgrestAuth)
app.get('/', c => c.text('Back3nd API running!'))

export default {
  port: 3000,
  fetch: app.fetch,
}
