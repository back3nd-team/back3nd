import type { Context } from 'hono'
import { OpenAPIHono } from '@hono/zod-openapi'
import { Hono } from 'hono'
import { contextStorage } from 'hono/context-storage'
import { cors } from 'hono/cors'
import { HTTPException } from 'hono/http-exception'
import { timeout } from 'hono/timeout'
import { auth } from '../../auth'
import { authMiddleware } from './middleware/authMiddleware'
import authRoutes from './routes/authRoutes'
import collectionRoutes from './routes/collectionRoutes'
import docsRoute from './routes/docsRoutes'
import { fileRoutes } from './routes/fileRoutes'
import hashRoutes from './routes/hashRoutes'
import itemRoutes from './routes/itemRoutes'
import prismaFileRoutes from './routes/prismaFIleRoutes'
import roleRoutes from './routes/roleRoutes'
import userRoutes from './routes/userRoutes'
import { generateOpenAPISpec } from './schemas/openApiGenerator'

// ---- hono app ----
const app = new Hono<{
  Variables: {
    user: auth.$Infer.Session.user | null
    session: auth.$Infer.Session.session | null
  }
}>()

function customTimeoutException(context) {
  return new HTTPException(408, {
    message: `Request timeout after waiting ${context.req.headers.get(
      'Duration',
    )} seconds. Please try again later.`,
  })
}

// async function initializeDocs() {
//   const openAPISpec = await generateOpenAPISpec()
//   app.doc('/api/doc', openAPISpec)
//   app.route('/api/docs', docsRoute)
// }

// initializeDocs().catch((err) => {
//   console.error('Failed to initialize docs:', err)
// })

/**
 * @todo Add CORS configuration to allow only localhost:3737
 */

app.on(['POST', 'GET'], '/api/auth/**', (c) => {
  return auth.handler(c.req.raw)
})

app.use('*', timeout(3000, customTimeoutException), cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

app.use('*', authMiddleware, contextStorage(), timeout(300000, customTimeoutException))
app.route('/api/auth', authRoutes)
app.route('/api/users', userRoutes)
app.route('/api/roles', roleRoutes)
app.route('/api/collections', collectionRoutes)
app.route('/api/items', itemRoutes)
app.route('/api/hash', hashRoutes)
app.route('/api/prisma/files', prismaFileRoutes)
app.route('/api/files', fileRoutes)

app.get('/api/me', (c: Context) => {
  const user = c.get('user')
  if (user) {
    c.set('user', {
      sub: user.sub,
      name: user.name,
      email: user.email,
      roles: user.roles,
      iss: user.iss,
      aud: user.aud,
      exp: user.exp,
    })
    return c.json({ message: `Hello, ${user.name}`, user })
  }

  return c.json({ error: 'User not found' }, 404)
})

app.notFound((c: Context) => {
  return c.json({ error: 'Not Found', message: 'The requested resource was not found' }, 404)
})

app.onError((err, c: Context) => {
  console.error('An error occurred:', err)
  return c.json({ error: 'Internal Server Error', message: err.message }, 500)
})

const port = Number.parseInt(Bun.env.API_PORT || '3737')
export default {
  port,
  fetch: app.fetch,
}
