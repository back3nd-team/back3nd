import type { Context } from 'hono'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { authMiddleware } from './middleware/authMiddleware'
import authRoutes from './routes/authRoutes'
import itemRoutes from './routes/itemRoutes'

const app = new Hono()
/**
 * @todo Add CORS configuration to allow only localhost:3737
 */
app.use('*', cors({
  origin: (origin: string) => {
    if (origin?.startsWith('http://localhost')) {
      return origin
    }
    return 'http://localhost:3737'
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use('*', authMiddleware)
app.route('/auth', authRoutes)
app.route('/items', itemRoutes)

app.get('/me', (c: Context) => {
  const user = c.get('user')
  return c.json({ message: `Hello, ${user.sub}`, role: user.role })
})

app.get('/', c => c.text('Alf Things'))

app.notFound((c: Context) => {
  return c.json({ error: 'Not Found', message: 'The requested resource was not found' }, 404)
})

app.onError((err, c: Context) => {
  console.error('An error occurred:', err)
  return c.json({ error: 'Internal Server Error', message: err.message }, 500)
})
const port = Number.parseInt(Bun.env.API_PORT || '3037')
export default {
  port,
  fetch: app.fetch,
}
