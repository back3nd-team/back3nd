import { useApiClient } from '../ApiClient'

type CreateCollectionInput = Pick<Collection, 'name' | 'email' | 'role'>

export async function useCreateCollection(collection: CreateCollectionInput) {
  return await useApiClient.createCollection(collection.name, collection.email, collection.role)
}
