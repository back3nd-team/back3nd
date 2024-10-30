import type { CreateCollectionData } from '../types/types'
import { useApiClient } from '../ApiClient'

export async function useCreatePermission(collection: CreateCollectionData) {
  return await useApiClient.createCollection(collection)
}
