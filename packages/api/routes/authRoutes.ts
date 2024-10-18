import { Hono } from 'hono'
import { AuthController } from '../controllers/authController'
import { authMiddleware } from '../middleware/authMiddleware'

const authRoutes = new Hono()

authRoutes.post('/register', AuthController.register)
authRoutes.post('/login', AuthController.login)
authRoutes.post('/renew', authMiddleware, AuthController.renewToken)

export default authRoutes
