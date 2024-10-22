import { useApiClient } from '../ApiClient'

export async function useGetCollections() {
  return await useApiClient.listCollections()
}
