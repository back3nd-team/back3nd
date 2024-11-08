import type { CreateCollectionData } from './types/types'
import { useAuthStore } from '@/store/authStore'
import { getActivePinia } from 'pinia'

class ApiClient {
  private baseURL: string

  constructor() {
    this.baseURL = this.getBaseURL()
  }

  public getBaseURL(): string {
    const isLocalhost = process.env.NODE_ENV === 'development'
    return isLocalhost ? 'http://localhost:3737/api' : `api/`
  }

  public getToken(): string | null {
    const pinia = getActivePinia()
    if (!pinia) {
      throw new Error('Pinia is not active! Ensure Pinia is properly initialized.')
    }

    const authStore = useAuthStore(pinia)
    return authStore.token
  }

  private async request<T>(url: string, options: any = {}): Promise<T> {
    const token = this.getToken()
    if (!token) {
      throw new Error('User is not authenticated. Please log in.')
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

  public async readItem<T>(collection: string, id: string | number): Promise<T> {
    return this.request<T>(`/items/${collection}/${id}`)
  }

  public async readItems<T>(collection: string, query: any = {}): Promise<T[]> {
    const queryString = new URLSearchParams(query).toString()
    return this.request<T[]>(`/items/${collection}?${queryString}`)
  }

  public async fetchCollections(): Promise<string[]> {
    const data = await this.request<{ collections: string[] }>('/items/collections')
    return data.collections
  }

  public async login(email: string, password: string): Promise<void> {
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
      throw new Error('Pinia is not active! Ensure Pinia is properly initialized.')
    }

    const authStore = useAuthStore(pinia)
    authStore.setToken(data.token)
    await authStore.fetchUserData() // Busca os dados do usuário após o login
  }

  public async logout(): Promise<void> {
    const pinia = getActivePinia()
    if (!pinia) {
      throw new Error('Pinia is not active! Ensure Pinia is properly initialized.')
    }

    const authStore = useAuthStore(pinia)
    authStore.clearAuthData()
    authStore.user = null
  }

  public async fetchUserData(): Promise<any> {
    return this.request<any>('/me')
  }

  public async createUser(name: string, email: string, password: string, roles: string[]): Promise<void> {
    await this.request('/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, roles }),
    })
  }

  public async listUsers(): Promise<any[]> {
    return this.request<any[]>('/users', {
      method: 'GET',
    })
  }

  public async getUser(userId: string): Promise<any> {
    return this.request<any>(`/users/${userId}`, {
      method: 'GET',
    })
  }

  public async updateUser(userId: string, email: string, password: string, roles: string[]): Promise<void> {
    await this.request(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ email, password, roles }),
    })
  }

  public async deleteUser(userId: string): Promise<void> {
    await this.request(`/users/${userId}`, {
      method: 'DELETE',
    })
  }

  public async createRole(name: string, description: string): Promise<void> {
    await this.request('/roles', {
      method: 'POST',
      body: JSON.stringify({ name, description }),
    })
  }

  public async listRoles(): Promise<any[]> {
    return this.request<any[]>('/roles', {
      method: 'GET',
    })
  }

  public async getRole(roleId: string): Promise<any> {
    return this.request<any>(`/roles/${roleId}`, {
      method: 'GET',
    })
  }

  public async updateRole(roleId: string, name: string, description: string): Promise<void> {
    await this.request(`/roles/${roleId}`, {
      method: 'PUT',
      body: JSON.stringify({ name, description }),
    })
  }

  public async deleteRole(roleId: string): Promise<void> {
    await this.request(`/roles/${roleId}`, {
      method: 'DELETE',
    })
  }

  public async listCollections(): Promise<any[]> {
    return this.request<any[]>('/collections', {
      method: 'GET',
    })
  }

  public async getCollection(collectionId: string): Promise<any> {
    return this.request<any>(`/collections/${collectionId}`, {
      method: 'GET',
    })
  }

  public async getPermissions(collectionId: string): Promise<any> {
    return this.request<any>(`/collections/${collectionId}/permissions`, {
      method: 'GET',
    })
  }

  public async createPermission(role_id: string, table_id: string, can_create: boolean, can_read: boolean, can_update: boolean, can_delete: boolean): Promise<any> {
    return this.request<any>(`/collections/${table_id}/permissions`, {
      method: 'POST',
      body: JSON.stringify({
        role_id,
        table_id,
        can_create,
        can_read,
        can_update,
        can_delete,
      }),
    })
  }

  public async updatePermission(role_id: string, table_id: string, can_create: boolean, can_read: boolean, can_update: boolean, can_delete: boolean): Promise<any> {
    return this.request<any>(`/collections/${table_id}/permissions`, {
      method: 'PUT',
      body: JSON.stringify({
        table_id,
        role_id,
        can_create,
        can_read,
        can_update,
        can_delete,
      }),
    })
  }

  public async deletePermission(role_id: string, table_id: string): Promise<void> {
    await this.request(`/collections/${table_id}/permissions`, {
      method: 'DELETE',
      body: JSON.stringify({
        role_id,
        table_id,
      }),
    })
  }

  public async createCollection(collection: CreateCollectionData): Promise<void> {
    return await this.request('/collections', {
      method: 'POST',
      body: JSON.stringify(collection),
    })
  }

  public async updateCollection(collectionId: string, collection: { name: string, email: string, role: string }): Promise<void> {
    await this.request(`/collections/${collectionId}`, {
      method: 'PUT',
      body: JSON.stringify(collection),
    })
  }

  public async deleteCollection(collectionId: string): Promise<void> {
    await this.request(`/collections/${collectionId}`, {
      method: 'DELETE',
    })
  }

  public async listEntityFields(entityId: string): Promise<any[]> {
    return this.request<any[]>(`/fields/${entityId}`, {
      method: 'GET',
    })
  }

  public async createEntityField(entityId: string, fieldData: any): Promise<void> {
    await this.request(`/fields/${entityId}`, {
      method: 'POST',
      body: JSON.stringify(fieldData),
    })
  }

  public async listPrismaFiles(): Promise<string[]> {
    return this.request<string[]>('/prisma/files', {
      method: 'GET',
    })
  }

  public async readPrismaFile(filename: string): Promise<{ model: string }> {
    return this.request<{ model: string }>(`/prisma/files/${filename}`, {
      method: 'GET',
    })
  }

  public async updatePrismaFile(filename: string, model: string): Promise<{ success: boolean, message: string }> {
    const result: { success: boolean, message: string } = await this.request(`/prisma/files/${filename}`, {
      method: 'POST',
      body: JSON.stringify({ model }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!result.success) {
      throw new Error(result.message)
    }
    return result
  }
}
export const useApiClient = new ApiClient()
