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
  console.log(user)
  if (!user) {
    return ctx.json({ error: 'User not authenticated' }, 401)
  }
  const expirationTimeInSeconds = 7 * 24 * 60 * 60 // 7 days in seconds
  const currentTimeInSeconds = Math.floor(Date.now() / 1000)
  const expirationTime = currentTimeInSeconds + expirationTimeInSeconds

  const tokenPayload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    role: 'owner', // aqui deve pegar do usuário conectado
    iss: 'back3nd',
    aud: 'back3nd-studio',
    exp: expirationTime,
  }

  // Gera o JWT usando a PostgrestService
  const token = await PostgrestService.generateToken(tokenPayload, expirationTime)

  return ctx.json({ token })
})

export default app
