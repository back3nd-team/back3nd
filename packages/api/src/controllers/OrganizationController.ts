import type { Context } from 'hono'
import { auth } from '../lib/auth'

export class OrganizationController {
  static async addMember(ctx: Context) {
    const { userId, organizationId, role } = await ctx.req.json()
    try {
      // @ts-expect-error i dont know
      const response = await auth.api.addMember({
        body: {
          userId,
          organizationId,
          role,
        },
      })
      return ctx.json(response)
    }
    catch (error: any) {
      return ctx.json({ error: error.message }, 500)
    }
  }
}
