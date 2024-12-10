import type { User } from '../src/models/User'
import { Hono } from 'hono'

export function protectedRoute() {
  const r = new Hono()

  r.get('/protected', async (ctx) => {
    const user = ctx.get('user') as User
    if (!user) {
      return ctx.json({ error: 'User not authenticated' }, 401)
    }

    return ctx.json({ message: 'Welcome!', user })
  })

  return r
}
