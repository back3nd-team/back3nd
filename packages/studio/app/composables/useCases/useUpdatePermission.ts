import { useApiClient } from '../ApiClient'

export async function useUpdatePermission(role_id: string, table_id: string, can_create: boolean, can_read: boolean, can_update: boolean, can_delete: boolean) {
  return await useApiClient.updatePermission(role_id, table_id, can_create, can_read, can_update, can_delete)
}
