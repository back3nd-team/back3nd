// middleware/auth.global.ts
import { useAuthStore } from '@/store/authStore'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  if (!authStore.token && to.path.startsWith('/admin')) {
    return navigateTo('/auth/')
  }
})
