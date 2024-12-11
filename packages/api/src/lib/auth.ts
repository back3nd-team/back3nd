import { betterAuth } from 'better-auth'
import { admin, bearer, jwt, openAPI, organization } from 'better-auth/plugins'
import { Pool } from 'pg'

const authConfig = {
  roles: ['admin', 'user', 'professor', 'gestorEscolar', 'gestorMunicipal'],
  trustedOrigins: [
    '*',
  ],
  basePath: '/auth',
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },
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
    admin(),
    organization(),
  ],
}

export const auth = betterAuth(authConfig)
export { authConfig }
