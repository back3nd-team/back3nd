import { useApiClient } from '../ApiClient'

export async function useGetPermissions(collectionName: string) {
  return await useApiClient.getPermissions(collectionName)
}
