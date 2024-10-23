import type { Context } from 'hono'
import { HashService } from '../services/hashService'

export async function hashPassword(c: Context) {
  const { password } = await c.req.json()
  if (!password) {
    return c.json({ error: 'Password is required' }, 400)
  }
  try {
    const hashedPassword = await HashService.hashPassword(password)
    return c.json({ hashedPassword })
  } catch (error) {
    console.error('Error hashing password:', error)
    return c.json({ error: 'Internal Server Error', message: error.message }, 500)
  }
}