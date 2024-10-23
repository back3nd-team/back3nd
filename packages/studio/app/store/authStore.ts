import { useApiClient } from '@/composables/ApiClient'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useLocalStorage<string | null>('auth_token', null),
    user: null as any,
  }),
  actions: {
    async initializeAuthState() {
      if (this.token) {
        try {
          await this.fetchUserData()
        }
        catch (error) {
          console.error('Failed to fetch user data during initialization:', error)
          this.logout()
        }
      }
    },
    async login(email: string, password: string) {
      try {
        await useApiClient.login(email, password)
        this.token = useApiClient.getToken()
        await this.fetchUserData()
      }
      catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },

    async logout() {
      try {
        await useApiClient.logout()
        this.token = null
        this.user = null
      }
      catch (error) {
        console.error('Logout failed:', error)
        throw error
      }
    },

    async fetchUserData() {
      try {
        const userData = await useApiClient.fetchUserData()
        this.user = userData
      }
      catch (error) {
        console.error('Fetching user data failed:', error)
        throw error
      }
    },

    setToken(token: string | null) {
      this.token = token
    },
  },
  persist: true,
})
