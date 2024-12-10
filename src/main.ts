import { Hono } from 'hono'
import { auth } from './auth'
import authMiddleware from './middleware/AuthMiddleware'
import { protectedRoute } from './protectedRoute'
import authRoute from './routes/AuthRoute'

const app = new Hono()
app.route('*', authMiddleware)

app.all('/api/auth/*', c => auth.handler(c.req.raw))
app.route('/api', protectedRoute())
app.route('/api/token', authRoute)
app.get('/', c => c.text('Back3nd API running!'))

export default {
  port: 3000,
  fetch: app.fetch,
}
