import type { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs' // Switched to bcryptjs
import { sign } from 'hono/jwt'
import { string, z } from 'zod'
import { authClient } from '../../../auth-client'
// Import the Better Auth instance
const prisma = new PrismaClient()

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export class AuthController {
  /**
   * Register a new user
   */
  static async register(c: Context) {
    try {
      // Validate the input
      const result = registerSchema.safeParse(await c.req.json())
      if (!result.success) {
        return c.json({ message: 'Invalid input', errors: result.error.errors }, 400)
      }

      const { email, password } = result.data

      // Check if the user already exists
      const existingUser = await prisma.back3nd_user.findUnique({
        where: { email },
      })

      if (existingUser) {
        return c.json({ message: 'A user with this email already exists.' }, 409)
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create the user in the database
      const user = await prisma.back3nd_user.create({
        data: {
          email,
          password: hashedPassword,
          name: 'User',
        },
      })

      // Link the user to Better Auth
      const session = await authClient.signUp.email({
        email: user.email,
        password,
        name: 'User',
      })

      return c.json(
        {
          message: 'User registered successfully',
          user: { id: user.id, email: user.email },
          session,
        },
        201,
      )
    }
    catch (error: any) {
      console.error('Registration error:', error)
      return c.json({ message: 'Registration failed', error: error.message }, 500)
    }
  }

  /**
   * Login an existing user
   */
  static async login(c: Context) {
    try {
      // Validate the input
      const result = registerSchema.safeParse(await c.req.json())
      if (!result.success) {
        return c.json({ message: 'Invalid input', errors: result.error.errors }, 400)
      }

      const { email, password } = result.data

      // Fetch the user from the database
      const user = await prisma.back3nd_user.findUnique({
        where: { email },
      })

      if (!user) {
        return c.json({ message: 'Invalid email or password.' }, 401) // Unauthorized
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return c.json({ message: 'Invalid email or password.' }, 401) // Unauthorized
      }

      // Generate a session using Better Auth
      const session = await authClient.signIn.email({
        email: user.email,
        password,
      })
      // console.log(session, 'session here')
      return c.json(
        {
          message: 'Login successful',
          user: { id: user.id, email: user.email },
          session,
        },
        200,
      )
    }
    catch (error: any) {
      // console.error('Login error:', error)
      return c.json({ message: 'Login failed', error: error.message }, 500)
    }
  }

  public static secret = process.env.JWT_SECRET // Replace with your actual secret key

  /**
   * Generate a new token with an updated expiration time
   */
  static async renewToken(c: Context) {
    try {
      // Retrieve the current session from the context
      const session = c.get('session')

      if (!session || !session.sub) {
        return c.json({ message: 'Session not found or invalid' }, 401) // Unauthorized
      }

      // Generate a new token
      const expiresInSeconds = 43200 // Default expiration time (12 hours)
      const payload = { sub: session.sub, email: session.email, name: session.name } // Example payload structure
      const exp = Math.floor(Date.now() / 1000) + expiresInSeconds
      const newToken = await sign({ ...payload, exp }, AuthController.secret!, 'HS256')

      return c.json({ message: 'Token renewed successfully', token: newToken })
    }
    catch (error: any) {
      // console.error('Token renewal error:', error)
      return c.json({ message: 'Failed to renew token', error: error.message }, 500)
    }
  }
}
