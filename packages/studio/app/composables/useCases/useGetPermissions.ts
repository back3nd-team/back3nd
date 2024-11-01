import { useApiClient } from '../ApiClient'

export async function useGetPermissions(entityId: string) {
  return await useApiClient.getPermissions(entityId)
}
