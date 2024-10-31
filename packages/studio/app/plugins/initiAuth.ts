// plugins/initAuth.ts
import { useAuthStore } from '@/store/authStore'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  authStore.initializeAuthState()
})
