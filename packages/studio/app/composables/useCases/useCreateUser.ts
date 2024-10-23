import type { back3nd_user as User } from '@prisma/client'
import { useApiClient } from '../ApiClient'

type CreateUserInput = Pick<User, 'name' | 'email' | 'password'>

export async function useCreateUser(user: CreateUserInput, roles: string[]) {
  return await useApiClient.createUser(user.name, user.email, user.password, roles)
}
