import { swaggerUI } from '@hono/swagger-ui'
import { Hono } from 'hono'
import { generateOpenAPISpec } from '../schemas/openApiGenerator'

const docsRoute = new Hono()

docsRoute.get('/', async (c) => {
  const openAPISpec = await generateOpenAPISpec()
  return c.json(openAPISpec)
})

docsRoute.get('/ui', swaggerUI({ url: '/docs' }))

export default docsRoute
