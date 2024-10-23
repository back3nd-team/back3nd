import type { Context } from 'hono'
import { RoleService } from '../services/roleService'

const roleService = new RoleService()

export async function createRole(c: Context) {
  const { name, description } = await c.req.json()
  const role = await roleService.createRole({ name, description })
  return c.json(role, 201)
}

export async function listRoles(c: Context) {
  const roles = await roleService.listRoles()
  return c.json(roles)
}

export async function getRole(c: Context) {
  const roleId = c.req.param('role_id')
  const role = await roleService.getRole(roleId)
  return c.json(role)
}

export async function updateRole(c: Context) {
  const roleId = c.req.param('role_id')
  const { name, description } = await c.req.json()
  const role = await roleService.updateRole(roleId, { name, description })
  return c.json(role)
}

export async function deleteRole(c: Context) {
  const roleId = c.req.param('role_id')
  await roleService.deleteRole(roleId)
  return c.json({ message: 'Role deleted' })
}