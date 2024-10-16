import type { Context } from 'hono'
import { AuthService } from '../services/authService'

export async function authMiddleware(c: Context, next: () => Promise<void>) {
  if (c.req.path.startsWith('/auth')) {
    return await next()
  }

  const authHeader = c.req.header('Authorization')

  if (!authHeader) {
    return c.json({ message: 'Missing Authorization Header' }, 401)
  }

  const tokenParts = authHeader.split(' ')

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return c.json({ message: 'Invalid Authorization Header format' }, 401)
  }

  const token = tokenParts[1]

  try {
    const payload = await AuthService.verifyToken(token)
    c.set('user', payload)
    await next()
  }
  catch (e: any) {
    return c.json({ message: 'Invalid token', error: e.message }, 401)
  }
}
