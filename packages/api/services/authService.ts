import { sign, verify as verifyJWT } from 'hono/jwt'

export class AuthService {
  static secret = Bun.env.JWT_SECRET || 'secret$tring'

  /**
   * Generates a JWT token with a specified payload and expiration time.
   *
   * @param {Record<string, unknown>} payload - The payload to include in the token.
   * @param {number} [expiresInSeconds] - The expiration time in seconds. Default is 43200 seconds (12 hours).
   * @returns {Promise<string>} The generated JWT token.
   *
   * @example
   * // Generate a token that expires in 2 hours
   * const token2Hours = await AuthService.generateToken({ sub: 'user@example.com' }, 7200)
   *
   * @example
   * // Generate a token that expires in 12 hours
   * const token12Hours = await AuthService.generateToken({ sub: 'user@example.com' }, 43200)
   */
  static async generateToken(payload: Record<string, unknown>, expiresInSeconds: number = 43200) {
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
