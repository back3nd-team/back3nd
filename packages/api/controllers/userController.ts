import type { Context } from 'hono'
import { UserService } from '../services/userService'

const userService = new UserService()

export async function createUser(c: Context) {
  const { email, password, roles } = await c.req.json()
  const user = await userService.createUser({ email, password, roles })
  return c.json(user, 201)
}

export async function listUsers(c: Context) {
  const users = await userService.listUsers()
  return c.json(users)
}

export async function getUser(c: Context) {
  const userId = c.req.param('user_id')
  const user = await userService.getUser(userId)
  return c.json(user)
}

export async function updateUser(c: Context) {
  const userId = c.req.param('user_id')
  const { email, password, roles } = await c.req.json()
  const user = await userService.updateUser(userId, { email, password, roles })
  return c.json(user)
}

export async function deleteUser(c: Context) {
  const userId = c.req.param('user_id')
  await userService.deleteUser(userId)
  return c.json({ message: 'User deleted' })
}
