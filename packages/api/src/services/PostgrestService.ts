import { sign, verify as verifyJWT } from 'hono/jwt'

export class PostgrestService {
  static secret = Bun.env.BETTER_AUTH_SECRET as string

  /**
   * Gera um token JWT com um payload especificado e tempo de expiração.
   *
   * @param {Record<string, unknown>} payload - O payload a ser incluído no token.
   * @param {number} [expiresInSeconds] - O tempo de expiração em segundos (padrão: 12 horas).
   * @returns {Promise<string>} O token JWT gerado.
   */
  static async generateToken(
    payload: Record<string, unknown>,
    expiresInSeconds: number = 43200,
  ): Promise<string> {
    const exp = Math.floor(Date.now() / 1000) + expiresInSeconds
    return await sign({ ...payload, exp }, this.secret, 'HS256')
  }

  /**
   * Obtém a sessão do usuário atual requisitando o endpoint `/api/auth/get-session`.
   *
   * @param {any} ctx - O contexto da requisição, contendo os cabeçalhos HTTP.
   * @returns {Promise<any>} Os dados da sessão do usuário.
   */
  static async getMe(ctx: any): Promise<any> {
    try {
      const response = await fetch('http://localhost:3000/api/auth/get-session', {
        method: 'GET',
        headers: {
          ...ctx.req.headers, // Passa os cabeçalhos da requisição, incluindo cookies
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user session')
      }

      const session = await response.json()

      if (!session || !session.user) {
        throw new Error('No active session found or user not authenticated')
      }

      return session.user // Retorna os dados do usuário autenticado
    }
    catch (error) {
      console.error('Error fetching session:', error)
      throw new Error('Failed to fetch user session')
    }
  }

  /**
   * Verifica a validade de um token JWT.
   *
   * @param {string} token - O token JWT a ser verificado.
   * @returns {Promise<Record<string, unknown>>} O payload decodificado se o token for válido.
   */
  static async verifyToken(token: string): Promise<Record<string, unknown>> {
    return await verifyJWT(token, this.secret, 'HS256')
  }
}
