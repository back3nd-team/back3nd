import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserRepository {
  async create(data: { name: string, email: string, password: string, role: string }) {
    const user = await prisma.back3nd_user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })

    const userRole = await prisma.back3nd_user_role.create({
      data: {
        user_id: user.id,
        role_id: data.role,
      },
    })

    const updatedUser = await prisma.back3nd_user.update({
      where: { id: user.id },
      data: {
        roles: {
          connect: { id: userRole.id },
        },
      },
    })

    return updatedUser
  }

  async findAll() {
    return prisma.back3nd_user.findMany({
      select: {
        id: true,
        name: true,
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
