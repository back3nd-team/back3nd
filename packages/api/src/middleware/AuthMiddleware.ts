import { createMiddleware } from 'hono/factory'
import { auth } from '../lib/auth'

const authMiddleware = createMiddleware<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}>(async (c, next) => {
  const headers = new Headers(c.req.raw.headers)
  const session = await auth.api.getSession({ headers })
  c.set('user', session?.user || null)
  c.set('session', session?.session || null)

  await next()
})

export default authMiddleware
