import type { Context } from 'hono'
import { Hono } from 'hono'

export function protectedRoute() {
  const r = new Hono()

  r.get('/protected', async (ctx: Context) => {
    const user = ctx.get('user') as any
    if (!user) {
      return ctx.json({ error: 'User not authenticated' }, 401)
    }

    return ctx.json({ message: 'Welcome!', user })
  })

  return r
}
