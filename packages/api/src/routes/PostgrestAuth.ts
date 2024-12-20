import { Hono } from 'hono'
import { PostgrestService } from '../services/PostgrestService'

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

app.post('/token', async (ctx) => {
  const user = ctx.get('user') as User
  if (!user) {
    return ctx.json({ error: 'User not authenticated' }, 401)
  }

  const tokenPayload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: 'back3ndboss', // aqui deve pegar do usuário conectado
    iss: 'back3nd',
    aud: 'back3nd-studio',
  }

  // Gera o JWT usando a PostgrestService
  const token = await PostgrestService.generateToken(tokenPayload)

  return ctx.json({ token })
})

export default app
