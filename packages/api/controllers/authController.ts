import type { Context } from 'hono'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
import { AuthService } from '../services/authService'

const prisma = new PrismaClient()
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
export class AuthController {
  static async register(c: Context) {
    const result = registerSchema.safeParse(await c.req.json())
    if (!result.success) {
      return c.json({ message: 'Invalid input', errors: result.error.errors }, 400)
    }

    const { email, password } = result.data

    try {
      const hashedPassword = await AuthService.hashPassword(password)
      const newUser = await prisma.back3nd_user.create({
        data: { email, password: hashedPassword, name: 'User' },
      })

      return c.json({ message: 'User registered successfully', user: newUser })
    }
    catch (error: any) {
      return c.json({ message: 'Error creating user', error: error.message }, 500)
    }
  }

  static async login(c: Context) {
    const result = registerSchema.safeParse(await c.req.json())
    if (!result.success) {
      return c.json({ message: 'Invalid input', errors: result.error.errors }, 400)
    }
    const { email, password } = result.data

    try {
      const user = await prisma.back3nd_user.findUnique({
        where: { email },
        include: { roles: true },
      })

      if (!user)
        return c.json({ message: 'Invalid email' }, 404)

      const validPassword = await AuthService.verifyPassword(password, user.password)
      if (!validPassword)
        return c.json({ message: 'Invalid password' }, 401)

      delete (user as { password?: string }).password
      delete (user as { reset_token?: string }).reset_token
      const tokenPayload = {
        sub: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles.map(role => ({
          id: role.id,
          role_id: role.role_id,
        })),
        iss: 'back3nd',
        aud: 'back3nd-studio',
      }
      const token = await AuthService.generateToken(tokenPayload)
      return c.json({ token })
    }
    catch (error: any) {
      return c.json({ message: 'Error logging in', error: error.message }, 500)
    }
  }

  static async renewToken(c: Context) {
    const user = c.get('user')

    const newToken = await AuthService.generateToken({
      sub: user.sub,
    }, 2220)

    return c.json({ token: newToken })
  }
}
