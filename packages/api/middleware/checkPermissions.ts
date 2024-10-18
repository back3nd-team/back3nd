import type { Context, Next } from 'hono'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Middleware to check permissions for a specific table and action.
 * @param tableName The name of the table to check permissions for
 * @param permissionType The type of permission to check (can_create, can_read, etc.)
 */
export function checkPermissions(tableName: string, permissionType: keyof { can_create: boolean, can_read: boolean, can_update: boolean, can_delete: boolean }) {
  return async (c: Context, next: Next) => {
    const user = c.get('user') // Get the authenticated user from the context

    if (!user || !user.role) {
      return c.json({ error: 'User or role not found' }, 403)
    }

    // Fetch the role by its UUID (role_id)
    const role = await prisma.back3nd_role.findUnique({
      where: { id: user.role },
    })

    if (!role) {
      return c.json({ error: 'Role not found' }, 403)
    }

    // Fetch the table by name
    const table = await prisma.back3nd_entity.findUnique({
      where: { name: tableName },
    })

    if (!table) {
      return c.json({ error: 'Table not found' }, 404)
    }

    // Fetch the user's permissions for the specific table
    const permission = await prisma.back3nd_permission.findUnique({
      where: {
        role_id_table_id: {
          role_id: role.id, // Use the role ID from the role object
          table_id: table.id, // The table's ID
        },
      },
    })

    if (!permission || permission[permissionType] !== true) {
      return c.json({ error: 'Access denied' }, 403)
    }

    // Permissão concedida, execute a próxima função
    await next()
  }
}
