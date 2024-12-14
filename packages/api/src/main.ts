import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth } from './lib/auth'
import authMiddleware from './middleware/AuthMiddleware'
import { protectedRoute } from './protectedRoute'
import PostgrestAuth from './routes/PostgrestAuth'

const app = new Hono({ strict: false })

app.use('*', authMiddleware)
app.use(
  '*',
  cors({
    origin: (origin) => {
      return origin || '*'
    },
    allowHeaders: ['Content-Type', 'Authorization', 'OrganizationId'],
    allowMethods: ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
)
app.all('/auth/*', c => auth.handler(c.req.raw))
app.route('/files', protectedRoute())
app.route('/postgrest', PostgrestAuth)
app.get('/', c => c.text('Back3nd API running!'))

export default {
  port: 3737,
  fetch: app.fetch,
}
