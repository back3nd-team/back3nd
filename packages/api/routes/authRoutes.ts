import { OpenAPIHono } from '@hono/zod-openapi'
import { Hono } from 'hono'
import { auth } from '../../../auth'
import { AuthController } from '../controllers/authController'
import { authMiddleware } from '../middleware/authMiddleware'

const authRoutes = new Hono()
authRoutes.post('/register', authMiddleware, AuthController.register)
authRoutes.post('/login', authMiddleware, AuthController.login)
authRoutes.post('/renew', authMiddleware, AuthController.renewToken)

export default authRoutes
