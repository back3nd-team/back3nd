import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export function isTokenExpired(token: string): boolean {
  try {
    const tokenPart = token.split('.')[1]
    if (!tokenPart) {
      throw new Error('Invalid token format')
    }
    const payload = JSON.parse(atob(tokenPart))
    const exp = payload.exp * 1000 // Convert to milliseconds
    return Date.now() >= exp
  }
  catch (error) {
    console.error('Error decoding token:', error)
    return true // Assume expired if there's an error
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useLocalStorage<string | null>('auth_token', null),
    user: null as any,
  }),
  actions: {
    async initializeAuthState() {
      if (this.token && !isTokenExpired(this.token)) {
        try {
          await this.fetchUserData()
        }
        catch (error) {
          console.error('Failed to fetch user data during initialization:', error)
          this.logout()
        }
      }
      else {
        this.logout() // Token is expired or missing
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
        this.clearAuthData()
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
    clearAuthData() {
      this.token = null
      this.user = null
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('auth_token')
      }
    },
  },
  persist: true,
})
