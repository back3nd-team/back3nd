import type { CreateCollectionData } from '../types/types'
import { useApiClient } from '../ApiClient'

export async function useCreateCollection(collection: CreateCollectionData) {
  return await useApiClient.createCollection(collection)
}
