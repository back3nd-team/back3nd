import { Hono } from 'hono'
import { AuthService } from '../services/AuthService'

interface User {
  id: string
  name: string
  email: string
  emailVerified: boolean
  image: string | null
  createdAt: Date
  updatedAt: Date
  roles: { id: string, role_id: string }[]
}

const app = new Hono<{
  Variables: {
    user: User | null
  }
}>()

app.post('/convert-token', async (ctx) => {
  const user = ctx.get('user') as User
  if (!user) {
    return ctx.json({ error: 'User not authenticated' }, 401)
  }

  const tokenPayload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: 'back3ndboss',
    iss: 'back3nd',
    aud: 'back3nd-studio',
  }

  // Gera o JWT usando a AuthService
  const token = await AuthService.generateToken(tokenPayload)

  return ctx.json({ token })
})

export default app
