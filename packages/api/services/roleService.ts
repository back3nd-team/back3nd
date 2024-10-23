import { RoleRepository } from '../repositories/roleRepository'

export class RoleService {
  private roleRepository = new RoleRepository()

  async createRole(data: { name: string, description: string }) {
    return this.roleRepository.create(data)
  }

  async listRoles() {
    return this.roleRepository.findAll()
  }

  async getRole(roleId: string) {
    return this.roleRepository.findById(roleId)
  }

  async updateRole(roleId: string, data: { name: string, description: string }) {
    return this.roleRepository.update(roleId, data)
  }

  async deleteRole(roleId: string) {
    return this.roleRepository.delete(roleId)
  }
}