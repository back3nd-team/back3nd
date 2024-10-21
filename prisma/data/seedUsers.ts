/**
 * @file seedUsers.ts
 * @description Seeds the initial users (admin, user, public) into the database and assigns roles.
 * Each user is inserted using an upsert strategy to avoid duplication.
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Function to hash passwords using Bun.password.hash with argon2id algorithm.
 */
async function hashPassword(password: string) {
  return await Bun.password.hash(password, {
    algorithm: 'argon2id',
  })
}

function generateRandomPassword(length = 8) {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)

  return Array.from(array, byte => String.fromCharCode(byte % 94 + 33)).join('')
}

export async function seedUsers() {
  // Use environment variables for passwords or generate random ones
  const adminPassword = Bun.env.BACK3ND_ADMIN_PASSWORD || generateRandomPassword()
  const userPassword = Bun.env.BACK3ND_USER_PASSWORD || generateRandomPassword()
  const publicPassword = Bun.env.BACK3ND_PUBLIC_PASSWORD || generateRandomPassword()

  // Hash passwords for the users using argon2id
  const hashedAdminPassword = await hashPassword(adminPassword)
  const hashedUserPassword = await hashPassword(userPassword)
  const hashedPublicPassword = await hashPassword(publicPassword)

  // Upsert the Admin user and assign the Admin role
  await prisma.back3nd_user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Back3nd Admin',
      email: 'admin@example.com',
      password: hashedAdminPassword,
      roles: {
        create: {
          role: {
            connect: { name: 'admin' }, // Connect to the Admin role
          },
        },
      },
    },
  })

  // Upsert the Common user and assign the Comum role
  await prisma.back3nd_user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      name: 'Back3nd User',
      email: 'user@example.com',
      password: hashedUserPassword,
      roles: {
        create: {
          role: {
            connect: { name: 'comum' }, // Connect to the Comum role
          },
        },
      },
    },
  })

  // Upsert the Public user and assign the Public role
  await prisma.back3nd_user.upsert({
    where: { email: 'public@example.com' },
    update: {},
    create: {
      name: 'Back3nd Public',
      email: 'public@example.com',
      password: hashedPublicPassword,
      roles: {
        create: {
          role: {
            connect: { name: 'public' }, // Connect to the Public role
          },
        },
      },
    },
  })

  // Log the generated passwords (for development purposes only)
  if (!Bun.env.BACK3ND_ADMIN_PASSWORD) {
    console.warn(`Generated Admin password: ${adminPassword}`)
  }
  if (!Bun.env.BACK3ND_USER_PASSWORD) {
    console.warn(`Generated User password: ${userPassword}`)
  }
  if (!Bun.env.BACK3ND_PUBLIC_PASSWORD) {
    console.warn(`Generated Public password: ${publicPassword}`)
  }
}

seedUsers().catch((e) => {
  console.error(e)
}).finally(async () => {
  await prisma.$disconnect()
})
