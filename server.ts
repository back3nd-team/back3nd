import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import authRoutes from './authRoutes';
import protectedRoutes from './protectedRoutes';

const app = new Hono();

// Montar rotas de autenticação
app.route('/api/auth', authRoutes);

// Montar rotas protegidas
app.route('/api/protected', protectedRoutes);

// Iniciar o servidor
export default { 
  port: 3000, 
  fetch: app.fetch, 
} 
