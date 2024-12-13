import { useLocalStorage } from '@vueuse/core'
import { defineStore, skipHydrate } from 'pinia'
import { computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = useLocalStorage<TUser | null>('auth/user', null)

  const isAuthenticated = computed(() => user.value !== null)

  function login(userData: TUser) {
    user.value = userData
  }

  function logout() {
    user.value = null
  }

  return {
    user: skipHydrate(user), // Persisted via localStorage
    isAuthenticated,
    login,
    logout,
  }
})

 