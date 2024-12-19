import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth } from './lib/auth'
import authMiddleware from './middleware/AuthMiddleware'
import { protectedRoute } from './protectedRoute'
import { fileRoutes } from './routes/fileRoutes'
import organizationRoutes from './routes/OrganizationRoutes'
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
app.all('/api/auth/*', c => auth.handler(c.req.raw))
app.route('/api/files', protectedRoute())
app.route('/api/postgrest', PostgrestAuth)
app.route('/api/organization', organizationRoutes)
app.route('/api/files', fileRoutes)
app.get('/api/', c => c.text('Back3nd API running!'))

export default {
  port: 3737,
  fetch: app.fetch,
}
