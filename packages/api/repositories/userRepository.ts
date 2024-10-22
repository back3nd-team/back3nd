import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserRepository {
  async create(data: { name: string, email: string, password: string, roles?: string[] }) {
    const existingUser = await prisma.back3nd_user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new Error('Oops! This email is already taken. Try another one!')
    }

    const user = await prisma.back3nd_user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    })

    const rolesArray = data.roles ?? []

    if (rolesArray.length > 0) {
      const userRoles = rolesArray.map(roleId => ({
        user_id: user.id,
        role_id: roleId,
      }))

      await prisma.back3nd_user_role.createMany({
        data: userRoles,
      })
    }

    return user
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
