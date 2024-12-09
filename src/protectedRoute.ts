import { Hono } from 'hono'
import { auth, authConfig } from './auth' // caso precise do authConfig
// Nenhum getSession import aqui, pois não funciona nessa versão

export function protectedRoute() {
  const r = new Hono()

  r.get('/protected', async (c) => {
    const req = new Request(c.req.raw.url, {
      method: c.req.method,
      headers: c.req.headers,
      body: c.req.body,
    })

    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    console.log(session)
    if (!session) return c.json({ error: 'Unauthorized' }, 401)

    

    return c.json({ message: 'Welcome!', user: session.user })

  })

  return r
}
