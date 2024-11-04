import type { Context } from 'hono'
import { swaggerUI } from '@hono/swagger-ui'
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

// Gerar a especificação OpenAPI
const openAPISpec = await generateOpenAPISpec()

// The OpenAPI documentation will be available at /doc
app.doc('/doc', openAPISpec) // Usar a especificação gerada
app.route('/docs', docsRoute) // Usar a rota de documentação
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

const port = Number.parseInt(Bun.env.API_PORT || '3037')
export default {
  port,
  fetch: app.fetch,
}
