import type { Context } from 'hono'
import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { authMiddleware } from './middleware/authMiddleware'
import authRoutes from './routes/authRoutes'
import collectionRoutes from './routes/collectionRoutes'
import docsRoute from './routes/docsRoutes'
import entityFieldsRoutes from './routes/entityFieldsRoutes'
import hashRoutes from './routes/hashRoutes'
import itemRoutes from './routes/itemRoutes'
import prismaFileRoutes from './routes/prismaFIleRoutes'
import roleRoutes from './routes/roleRoutes'
import userRoutes from './routes/userRoutes'
import { generateOpenAPISpec } from './schemas/openApiGenerator' // Importar a função

const app = new OpenAPIHono({ strict: false })

async function initializeDocs() {
  const openAPISpec = await generateOpenAPISpec()
  app.doc('/doc', openAPISpec)
  app.route('/docs', docsRoute)
}

initializeDocs().catch((err) => {
  console.error('Failed to initialize docs:', err)
})

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
app.route('/users', userRoutes)
app.route('/roles', roleRoutes)
app.route('/collections', collectionRoutes)
app.route('/items', itemRoutes)
app.route('/hash', hashRoutes)
app.route('/fields', entityFieldsRoutes)
app.route('/prisma/files', prismaFileRoutes)

app.get('/me', (c: Context) => {
  const user = c.get('user')
  return c.json({ message: `Hello, ${user.name}`, user })
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
