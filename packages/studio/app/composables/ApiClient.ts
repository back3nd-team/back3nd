import { useAuthStore } from '@/store/authStore'
import { getActivePinia } from 'pinia'

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private getToken(): string | null {
    const pinia = getActivePinia()
    if (!pinia) {
      throw new Error('Pinia is not active! Make sure Pinia is properly initialized, and maybe take a coffee break!')
    }
    return useAuthStore(pinia).token
  }

  private async request<T>(url: string, options: any = {}): Promise<T> {
    const token = this.getToken()
    if (!token) {
      throw new Error('User is not authenticated. Please log in. And maybe take a coffee break!')
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    }

    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  public readItem = async <T>(collection: string, id: string | number): Promise<T> => {
    return this.request<T>(`/items/${collection}/${id}`)
  }

  public readItems = async <T>(collection: string, query: any = {}): Promise<T[]> => {
    const queryString = new URLSearchParams(query).toString()
    return this.request<T[]>(`/items/${collection}?${queryString}`)
  }

  public fetchCollections = async (): Promise<string[]> => {
    const data = await this.request<{ tables: string[] }>('/items/collections')
    return data.tables
  }

  public login = async (email: string, password: string): Promise<void> => {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    const pinia = getActivePinia()
    if (!pinia) {
      throw new Error('Pinia is not active! Make sure Pinia is properly initialized.')
    }
    useAuthStore(pinia).setToken(data.token)
  }

  public logout = async (): Promise<void> => {
    await this.request('/auth/logout', {
      method: 'POST',
    })
    const pinia = getActivePinia()
    if (!pinia) {
      throw new Error('Pinia is not active! Make sure Pinia is properly initialized, amigo.')
    }
    useAuthStore(pinia).setToken(null)
  }
}

export const useApiClient = new ApiClient('http://localhost:3737')
