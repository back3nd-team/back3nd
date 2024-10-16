import type { Context } from 'hono'
import { Hono } from 'hono'
import { authMiddleware } from './middleware/authMiddleware'
import authRoutes from './routes/authRoutes'

const app = new Hono()

// Porta da API
const port = Number.parseInt(Bun.env.API_PORT || '3037')

// Aplicar autenticação para todas as rotas, exceto as de autenticação
app.use('*', authMiddleware)
app.route('/auth', authRoutes)

// Rota protegida de exemplo
app.get('/protected', (c: Context) => {
  const user = c.get('user')
  return c.json({ message: `Hello, ${user.sub}`, role: user.role })
})

// Rota principal
app.get('/', c => c.text('Alf Things'))

export default {
  port,
  fetch: app.fetch,
}
