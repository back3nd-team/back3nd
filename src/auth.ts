import { betterAuth } from 'better-auth'
import { Pool } from 'pg';

const authConfig = {
  basePath: '/api/auth',
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  multiTenancy: {
    enabled: true,
    getTenantId: (request:any) => {
      const tenantId = request.headers.get('x-tenant-id');
      if (!tenantId) throw new Error('Missing x-tenant-id header');
      return tenantId;
    },
  },
  emailAndPassword: {
    enabled: true,
  },
}
export const auth = betterAuth(authConfig)
export { authConfig }
