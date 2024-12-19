import { sign, verify as verifyJWT } from 'hono/jwt'

export class PostgrestService {
  static secret = Bun.env.BETTER_AUTH_SECRET as string

  /**
   * Generates a JWT token with a specified payload and expiration time.
   *
   * @param {Record<string, unknown>} payload - The payload to be included in the token.
   * @param {number} [expiresInSeconds] - The expiration time in seconds (default: 12 hours).
   * @returns {Promise<string>} The generated JWT token.
   */
  static async generateToken(
    payload: Record<string, unknown>,
    expiresInSeconds: number = 43200,
  ): Promise<string> {
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds
    return await sign({ ...payload, exp }, this.secret, 'HS256')
  }

  /**
   * Retrieves the current user's session by requesting the `/api/auth/get-session` endpoint.
   *
   * @param {any} ctx - The request context, containing the HTTP headers.
   * @returns {Promise<any>} The user's session data.
   */
  static async getMe(ctx: any): Promise<any> {
    try {
      const response = await fetch('http://localhost:3000/api/auth/get-session', {
        method: 'GET',
        headers: {
          ...ctx.req.headers, // Pass the request headers, including cookies
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user session')
      }

      const session = await response.json()

      if (!session || !session.user) {
        throw new Error('No active session found or user not authenticated')
      }

      return session.user // Return the authenticated user's data
    }
    catch (error) {
      console.error('Error fetching session:', error)
      throw new Error('Failed to fetch user session')
    }
  }

  /**
   * Verifies the validity of a JWT token.
   *
   * @param {string} token - The JWT token to be verified.
   * @returns {Promise<Record<string, unknown>>} The decoded payload if the token is valid.
   */
  static async verifyToken(token: string): Promise<Record<string, unknown>> {
    return await verifyJWT(token, this.secret, 'HS256')
  }
}
