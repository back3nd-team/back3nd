/**
 * @file seed.ts
 * @description Main seed file that triggers the seeding process for roles and users.
 * It calls the seed functions from separate files located in the "data/" directory.
 *
 * Usage: Run this file with Deno to seed the database.
 */

import { PrismaClient } from '@prisma/client'

// Import seed functions
import { seedRoles } from './data/seedRoles'
import { seedUsers } from './data/seedUsers'

const prisma = new PrismaClient()

/**
 * Main seed function that calls the seed functions for roles and users.
 */
async function main() {
  try {
    // Seed roles first
    await seedRoles()
    console.warn('Roles seeded successfully!')

    // Seed users after roles
    await seedUsers()
    console.warn('Users seeded successfully!')
  }
  catch (error) {
    console.error('Error during seeding:', error)
  }
  finally {
    await prisma.$disconnect()
  }
}

main()
