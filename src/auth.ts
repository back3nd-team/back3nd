import { betterAuth } from 'better-auth'
import { bearer, jwt } from 'better-auth/plugins'
import { Pool } from 'pg'

const authConfig = {
  basePath: '/api/auth',
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
    jwt({
      jwks: {
        disablePrivateKeyEncryption: true,
        keyPairConfig: {
          alg: 'EdDSA',
          crv: 'Ed25519',
        },
      },
    }),
    bearer(),
  ],
}

export const auth = betterAuth(authConfig)
export { authConfig }
