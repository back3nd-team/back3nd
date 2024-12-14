import { betterAuth } from 'better-auth'
import { admin, bearer, jwt, openAPI, organization } from 'better-auth/plugins'
import { Pool } from 'pg'

const authConfig = {
  roles: ['admin', 'user', 'professor', 'gestorEscolar', 'gestorMunicipal'],
  trustedOrigins: [
    '*',
  ],
  basePath: '/auth',
  baseURL: import.meta.env.BETTER_AUTH_URL,
  database: new Pool({
    connectionString: import.meta.env.BETTER_AUTH_DATABASE,
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
    organization({
      allowUserToCreateOrganization: async (user: any) => {
        return user.role === 'admin'
      },
    }),
  ],
}
export const auth = betterAuth(authConfig)
export { authConfig }
