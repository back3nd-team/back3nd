import { Context } from 'hono'

declare module 'hono' {
  interface Context {
    get: (key: 'user') => {
      sub: string
      name: string
      email: string
      roles: { id: string, role_id: string }[]
      iss: string
      aud: string
      exp: number
    }
  }
}
