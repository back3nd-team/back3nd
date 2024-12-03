import type { MiddlewareHandler } from 'hono'
import { auth } from '../../../auth' // Import the Better Auth instance

/**
 * Authentication Middleware
 * This middleware retrieves the session using Better Auth
 * and attaches the user and session data to the context.
 */
export const authMiddleware: MiddlewareHandler = async (c, next) => {
  try {
    // Retrieve the session using request headers
    const session = await auth.api.getSession({ headers: c.req.raw.headers })

    if (!session) {
      // No session found, set user and session as null
      c.set('user', null)
      c.set('session', null)
    }
    else {
      // Session exists, set user and session in the context
      c.set('user', session.user)
      c.set('session', session.session)
    }

    // Proceed to the next middleware or route handler
    await next()
  }
  catch (error: any) {
    console.error('Auth Middleware Error:', error)
    return c.json(
      { message: 'Unauthorized', error: error.message || 'Session retrieval failed' },
      401,
    ) // Return 401 Unauthorized on failure
  }
}
