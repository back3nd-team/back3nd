import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserRepository {
  async create(data: { email: string, password: string, roles: string[] }) {
    return prisma.back3nd_user.create({
      data: {
        email: data.email,
        password: data.password,
        roles: {
          connect: data.roles.map(roleId => ({ id: roleId })),
        },
      },
    })
  }

  async findAll() {
    return prisma.back3nd_user.findMany({
      select: {
        id: true,
        email: true,
        created_at: true,
        updated_at: true,
        roles: {
          select: {
            id: true,
            created_at: true,
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })
  }

  async findById(userId: string) {
    return prisma.back3nd_user.findUnique({
      where: { id: userId },
      include: { roles: true },
    })
  }

  async update(userId: string, data: { email: string, password: string, roles: string[] }) {
    return prisma.back3nd_user.update({
      where: { id: userId },
      data: {
        email: data.email,
        password: data.password,
        roles: {
          set: data.roles.map(roleId => ({ id: roleId })),
        },
      },
    })
  }

  async delete(userId: string) {
    return prisma.back3nd_user.delete({
      where: { id: userId },
    })
  }
}
