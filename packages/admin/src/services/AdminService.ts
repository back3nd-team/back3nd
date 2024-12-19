import { createAuthClient } from 'better-auth/client'
import { adminClient } from 'better-auth/client/plugins'

/**
 * AdminService class for managing administrative actions like user and role management.
 */
export class AdminService {
  private client: any // @TODO: Replace with proper type when available

  constructor() {
    const AUTH_API = import.meta.env.VITE_AUTH_API_URL
    this.client = createAuthClient({
      baseURL: AUTH_API,
      plugins: [adminClient()],
    })
  }

  /**
   * List users with optional filters and sorting.
   * @param query Query parameters to filter, sort, and paginate users.
   * @returns A promise resolving to the list of users.
   */
  async listUsers(query?: {
    searchField?: 'email' | 'name'
    searchOperator?: 'contains' | 'starts_with' | 'ends_with'
    searchValue?: string
    limit?: number
    offset?: number
    sortBy?: string
    sortDirection?: 'asc' | 'desc'
    filterField?: string
    filterOperator?: 'eq' | 'neq'
    filterValue?: string
  }) {
    try {
      const { data } = await this.client.admin.listUsers({ query })
      return data.users
    }
    catch (error: any) {
      console.error('Failed to list users:', error)
      throw new Error(`Error listing users: ${error.message}`)
    }
  }

  /**
   * Create a new user.
   * @param name Name of the user.
   * @param email Email of the user.
   * @param password Password for the user.
   * @param role Role to assign to the user.
   * @param data Additional data to store in the user.
   * @returns A promise resolving to the created user.
   */
  async createUser(name: string, email: string, password: string, role: string, data?: Record<string, unknown>) {
    const response = await this.client.admin.createUser({
      name,
      email,
      password,
      role,
      data,
    })
    if (response?.data) {
      return response?.data
    }
    else {
      console.error('Failed to create user by Admin:', response.error)
      throw new Error(`Error creating user by Admin: ${error.message}`)
    }
  }

  /**
   * Set a role for a user.
   * @param userId ID of the user.
   * @param role Role to assign.
   * @returns A promise resolving to the updated user.
   */
  async setUserRole(userId: string, role: string) {
    try {
      const updatedUser = await this.client.admin.setRole({ userId, role })
      return updatedUser
    }
    catch (error: any) {
      console.error('Failed to set user role:', error)
      throw new Error(`Error setting user role: ${error.message}`)
    }
  }

  /**
   * Ban a user.
   * @param userId ID of the user.
   * @param banReason Reason for the ban (optional).
   * @param banExpiresIn Duration of the ban in seconds (optional).
   * @returns A promise resolving to the banned user.
   */
  async banUser(userId: string, banReason?: string, banExpiresIn?: number) {
    try {
      const bannedUser = await this.client.admin.banUser({
        userId,
        banReason,
        banExpiresIn,
      })
      return bannedUser
    }
    catch (error: any) {
      console.error('Failed to ban user:', error)
      throw new Error(`Error banning user: ${error.message}`)
    }
  }

  /**
   * Unban a user.
   * @param userId ID of the user.
   * @returns A promise resolving to the unbanned user.
   */
  async unbanUser(userId: string) {
    try {
      const unbannedUser = await this.client.admin.unbanUser({ userId })
      return unbannedUser
    }
    catch (error: any) {
      console.error('Failed to unban user:', error)
      throw new Error(`Error unbanning user: ${error.message}`)
    }
  }

  /**
   * Remove a user from the system.
   * @param userId ID of the user to remove.
   * @returns A promise resolving to the removed user.
   */
  async removeUser(userId: string) {
    try {
      const deletedUser = await this.client.admin.removeUser({ userId })
      return deletedUser
    }
    catch (error: any) {
      console.error('Failed to remove user:', error)
      throw new Error(`Error removing user: ${error.message}`)
    }
  }
}
