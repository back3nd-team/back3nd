import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { generateOpenAPISpec } from '../schemas/openApiGenerator'

const docsRoute = new OpenAPIHono()

docsRoute.get('/', async (c) => {
  const openAPISpec = await generateOpenAPISpec()
  return c.json(openAPISpec)
})

docsRoute.get('/swagger', swaggerUI({ url: '/docs' }))

export default docsRoute
