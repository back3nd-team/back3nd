import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class RoleRepository {
  async create(data: { name: string, description: string }) {
    return prisma.back3nd_role.create({
      data: {
        name: data.name,
        description: data.description,
      },
    })
  }

  async findAll() {
    return prisma.back3nd_role.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
      },
    })
  }

  async findById(roleId: string) {
    return prisma.back3nd_role.findUnique({
      where: { id: roleId },
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
      },
    })
  }

  async update(roleId: string, data: { name: string, description: string }) {
    return prisma.back3nd_role.update({
      where: { id: roleId },
      data: {
        name: data.name,
        description: data.description,
      },
    })
  }

  async delete(roleId: string) {
    return prisma.back3nd_role.delete({
      where: { id: roleId },
    })
  }
}