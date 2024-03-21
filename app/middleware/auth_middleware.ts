import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * AuthMiddleware is used to verify access tokens in incoming requests
 * for token-based authentication.
 */
export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    // Check for a valid access token in the authorization header
    const isAuthenticated = await ctx.auth.check()

    // If not authenticated, return an unauthorized response
    if (!isAuthenticated) {
      return ctx.response.status(401).send('Unauthorized')
    }

    // User is authenticated, proceed with the request
    return next()
  }
}
