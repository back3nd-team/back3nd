import { Hono } from 'hono'
import { auth } from './auth'

export function protectedRoute() {
  const r = new Hono()

  r.get('/protected', async (c) => {
    const session = await auth.api.getSession({ headers: c.req.raw.headers })
    console.log(session)
    if (!session)
      return c.json({ error: 'Unauthorized' }, 401)

    return c.json({ message: 'Welcome!', user: session })
  })

  return r
}
