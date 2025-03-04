import { createAuthClient } from 'better-auth/client'
import { organizationClient } from 'better-auth/client/plugins'
import extractBaseUrl from '../utils/extractBaseUrl'
/**
 * Organization Service class for managing organization-related requests.
 */
export class OrganizationService {
  public client: any // @TODO: Fix type
  public api: string
  constructor() {
    this.api = import.meta.env.VITE_AUTH_API_URL
    this.client = createAuthClient({
      baseURL: this.api,
      plugins: [
        organizationClient(),
      ],
    })
  }

  /**
   * Creates a new organization.
   * @param name Name of the organization.
   * @param slug Unique slug for the organization.
   * @param logo URL of the organization's logo (optional).
   * @returns A promise resolving to the created organization.
   */
  async createOrganization(name: string, slug: string, logo?: string, metadata?: Record<string, unknown>) {
    if (!name || !slug) {
      throw new Error('Name and slug are required')
    }

    const { data, error } = await this.client.organization.create({
      name,
      slug,
      logo,
      metadata,
    })

    if (error) {
      console.error('API Error:', error)
      return error
    }
    return data
  }

  /**
   * Updates an organization.
   * @param organizationId ID of the organization.
   * @param data Data to update the organization.
   * @returns A promise resolving to the updated organization.
   */
  async updateOrganization(organizationId: string, data: Record<string, unknown>) {
    try {
      const organization = await this.client.organization.update({
        organizationId,
        data,
      })
      return organization
    }
    catch (error) {
      throw new Error(`Failed to update organization: ${(error as Error).message}`)
    }
  }

  /**
   * Deletes an organization.
   * @param organizationId ID of the organization to delete.
   * @returns A promise resolving to the deleted organization ID.
   */
  async deleteOrganization(organizationId: string) {
    try {
      const response = await this.client.organization.delete({
        organizationId,
      })
      return response
    }
    catch (error) {
      throw new Error(`Failed to delete organization: ${(error as Error).message}`)
    }
  }

  /**
   * Lists all organizations for the current user.
   * @returns A promise resolving to the list of organizations.
   */
  async listOrganizations() {
    try {
      const { data } = await this.client.organization.list()
      return data
    }
    catch (error) {
      throw new Error(`Failed to list organizations: ${(error as Error).message}`)
    }
  }

  /**
   * Sets the active organization for the user.
   * @param organizationId ID of the organization to set as active.
   * @returns A promise resolving to the active organization.
   */
  async setActiveOrganization(organizationId: string) {
    try {
      const organization = await this.client.organization.setActive({
        organizationId,
      })
      return organization
    }
    catch (error) {
      throw new Error(`Failed to set active organization: ${(error as Error).message}`)
    }
  }

  /**
   * Retrieves full details of an organization.
   * @param organizationId ID of the organization.
   * @returns A promise resolving to the organization details.
   */
  async getFullOrganization(organizationId: string) {
    const { data } = await this.client.organization.getFullOrganization({
      query: {
        organizationId,
      },
    })
    return data
  }

  /**
   * Invites a member to an organization.
   * @param email Email of the user to invite.
   * @param role Role to assign to the invited user.
   * @param organizationId ID of the organization.
   * @returns A promise resolving to the invitation details.
   */
  async inviteMember(email: string, role: string, organizationId: string) {
    try {
      const invitation = await this.client.organization.inviteMember({
        email,
        role,
        organizationId,
      })
      return invitation
    }
    catch (error) {
      throw new Error(`Failed to invite member: ${(error as Error).message}`)
    }
  }

  async listOrganizationRoles(organizationId: string) {
    try {
      const roles = await this.client.organization.getRoles({
        organizationId,
      })

      return roles
    }
    catch (error: any) {
      console.error('Failed to fetch roles:', error)
      throw new Error(`Error fetching roles: ${error.message}`)
    }
  }

  async addMemberToOrg(userId: string, organizationId: string, role: string) {
    const baseUrl = extractBaseUrl(this.api)
    const response = await fetch(`${baseUrl}/organization/add-member`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        organizationId,
        role,
      }),
    })
    return response
  }
}
