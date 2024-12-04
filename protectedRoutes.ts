import { Hono } from 'hono';
import { auth } from './auth';

const protectedRoutes = new Hono();

// Middleware para adicionar sessão e usuário ao contexto
protectedRoutes.use('*', async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  c.set('user', session?.user || null);
  c.set('session', session?.session || null);
  await next();
});

// Exemplo de rota protegida
protectedRoutes.get('/api/protected', (c) => {
  const user = c.get('user');
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  return c.json({ message: 'Welcome!', user });
});

export default protectedRoutes;
