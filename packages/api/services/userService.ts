import { UserRepository } from '../repositories/userRepository'
import { HashService } from '../services/hashService'

export class UserService {
  private userRepository = new UserRepository()

  async createUser(data: { name: string, email: string, password: string, role: string }) {
    data.password = await HashService.hashPassword(data.password)
    return this.userRepository.create(data)
  }

  async listUsers() {
    return this.userRepository.findAll()
  }

  async getUser(userId: string) {
    return this.userRepository.findById(userId)
  }

  async updateUser(userId: string, data: { email: string, password: string, roles: string[] }) {
    return this.userRepository.update(userId, data)
  }

  async deleteUser(userId: string) {
    return this.userRepository.delete(userId)
  }
}
