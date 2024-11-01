// packages/studio/utils/fetchWithAuth.ts
import { useAuthStore } from '@/store/authStore'

export async function fetchWithAuth<T>(url: string, options: any = {}) {
  const config = useRuntimeConfig()
  const token = useAuthStore().token
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
  }

  return useFetch<T>(url, {
    baseURL: config.public.apiBase,
    ...options,
    headers,
  })
}
