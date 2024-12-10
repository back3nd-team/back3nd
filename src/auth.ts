import { betterAuth } from 'better-auth'
import { bearer, jwt, openAPI } from 'better-auth/plugins'
import { Pool } from 'pg'

const authConfig = {
  basePath: '/auth',
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  multiTenancy: {
    enabled: true,
    getTenantId: (request: Request) => {
      const tenantId = request.headers.get('x-tenant-id')
      if (!tenantId)
        throw new Error('Missing x-tenant-id header')
      return tenantId
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    openAPI(),
    jwt({
      jwks: {
        keyPairConfig: {
          alg: 'ES256',
        },
      },
    }),
    bearer(),
  ],
}

export const auth = betterAuth(authConfig)
export { authConfig }
