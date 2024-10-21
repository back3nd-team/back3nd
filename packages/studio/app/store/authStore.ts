import { fetchWithAuth } from '@/utils/fetchWithAuth'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as any,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const { data, error } = await useFetch<{ token: string, user: any }>(`/auth/login`, {
          baseURL: 'http://localhost:3737',
          method: 'POST',
          body: { email, password },
        })

        if (error.value) {
          throw new Error(error.value.message)
        }

        if (data.value) {
          this.token = data.value.token
          this.user = data.value.user
        }
        else {
          throw new Error('Login response data is undefined')
        }
      }
      catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    logout() {
      this.token = null
      this.user = null
    },
    async fetchUserData() {
      try {
        const { data, error } = await fetchWithAuth<{ user: any }>('/protected')
        if (error.value) {
          throw new Error(error.value.message)
        }

        this.user = data.value
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
})
