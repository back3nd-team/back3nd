// middleware/auth.global.ts
import { isTokenExpired, useAuthStore } from '@/store/authStore'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const token = authStore.token

  if (!token || isTokenExpired(token)) {
    if (to.path.startsWith('/admin')) {
      return navigateTo('/auth/')
    }
  }
})
