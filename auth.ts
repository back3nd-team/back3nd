import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  multiTenancy: {
    enabled: true,
    getTenantId: (request) => {
      const tenantId = request.headers.get('x-tenant-id');
      if (!tenantId) throw new Error('Missing x-tenant-id header');
      return tenantId;
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});
