import { sign, verify as verifyJWT } from 'hono/jwt'

export class AuthService {
  static secret = Bun.env.JWT_SECRET || 'secret$tring'

  static async generateToken(payload: Record<string, unknown>, expiresInSeconds: number = 2220) {
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds
    return await sign({ ...payload, exp }, this.secret, 'HS256')
  }

  static async hashPassword(password: string) {
    return await Bun.password.hash(password, { algorithm: 'argon2id' })
  }

  static async verifyPassword(password: string, hashedPassword: string) {
    return await Bun.password.verify(password, hashedPassword)
  }

  static async verifyToken(token: string) {
    return await verifyJWT(token, this.secret, 'HS256')
  }
}
