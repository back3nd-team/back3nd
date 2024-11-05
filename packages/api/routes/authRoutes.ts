import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { AuthController } from '../controllers/authController'
import { authMiddleware } from '../middleware/authMiddleware'
import { RegisterResponseSchema, RegisterSchema } from '../schemas/authSchemas'
import { ErrorSchema } from '../schemas/errorSchema'

const authRoutes = new OpenAPIHono()

authRoutes.openapi(
  createRoute({
    method: 'post',
    path: '/register',
    request: {
      body: {
        content: {
          'application/json': { schema: RegisterSchema },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': { schema: RegisterResponseSchema },
        },
        description: 'User registration successful with JWT token response',
      },
      400: {
        content: {
          'application/json': { schema: ErrorSchema },
        },
        description: 'Bad Request - Validation errors for registration',
      },
    },
  }),
  //@ts-expect-error
  AuthController.register,
)
authRoutes.post('/login', AuthController.login)
authRoutes.post('/renew', authMiddleware, AuthController.renewToken)

export default authRoutes
