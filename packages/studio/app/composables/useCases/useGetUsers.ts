import type { back3nd_user as User } from '@prisma/client'
import { useApiClient } from '../ApiClient'

export async function useGetUsers(): Promise<User[]> {
  return await useApiClient.listUsers()
}
