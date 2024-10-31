import type { CreateCollectionData } from '../types/types'
import { useApiClient } from '../ApiClient'

export async function useCreatePermission(role_id: string, table_id: string, can_create: boolean, can_read: boolean, can_update: boolean, can_delete: boolean) {
  return await useApiClient.createPermission(role_id, table_id, can_create, can_read, can_update, can_delete)
}
