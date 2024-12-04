import { Hono } from 'hono';
import { auth } from './auth';
import { cors } from 'hono/cors';

const authRoutes = new Hono();

// Configurar rotas de autenticação
authRoutes.all('/api/auth/*', (c) => auth.handler(c.req.raw));

// Configurar CORS
authRoutes.use(
  '/api/auth/*',
  cors({
    origin: '*', // Substitua com seu domínio em produção
    allowHeaders: ['Content-Type', 'Authorization', 'x-tenant-id'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
);

export default authRoutes;
