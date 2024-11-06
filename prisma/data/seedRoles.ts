/**
 * @file seedRoles.ts
 * @description Seeds the initial roles (Admin, Comum, Public) into the database.
 * Each role is inserted using an upsert strategy to avoid duplication.
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * Get the ID of a role by its name.
 * @param roleName The name of the role
 * @returns The role ID
 */
async function getRoleId(roleName: string): Promise<string> {
  const role = await prisma.back3nd_role.findUnique({
    where: { name: roleName },
  })

  if (!role) {
    throw new Error(`Role not found: ${roleName}`)
  }

  return role.id
}

/**
 * Assign permissions to a role for a specific table.
 * @param roleName The name of the role
 * @param tableId The ID of the table
 * @param permissions The permissions to be assigned
 */
async function assignPermissionsToRole(roleName: string, tableId: string, permissions: { can_create: boolean, can_read: boolean, can_update: boolean, can_delete: boolean }) {
  const roleId = await getRoleId(roleName)

  await prisma.back3nd_permission.upsert({
    where: {
      role_id_table_id: {
        role_id: roleId,
        table_id: tableId,
      },
    },
    update: permissions,
    create: {
      role: { connect: { id: roleId } },
      table: { connect: { id: tableId } },
      ...permissions,
    },
  })
}

export async function seedRoles() {
  const roles = [
    {
      name: 'admin',
      description: 'Administrator with full access to all tables',
    },
    {
      name: 'comum',
      description: 'Common user with limited access',
    },
    {
      name: 'public',
      description: 'Public user with read-only access to public tables',
    },
  ]

  // Upsert each role into the database to avoid duplication
  for (const role of roles) {
    await prisma.back3nd_role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    })
  }

  // Ensure that the 'test_table' entity exists in the database
  // const testTable = await prisma.back3nd_entity.upsert({
  //   where: { name: 'test_table' },
  //   update: {},
  //   create: {
  //     name: 'test_table',
  //   },
  // })

  // // Assign permissions for the Admin role on test_table
  // await assignPermissionsToRole('admin', testTable.id, {
  //   can_create: true,
  //   can_read: true,
  //   can_update: true,
  //   can_delete: true,
  // })

  // // Assign permissions for the Comum role on test_table (no access)
  // await assignPermissionsToRole('comum', testTable.id, {
  //   can_create: false,
  //   can_read: false,
  //   can_update: false,
  //   can_delete: false,
  // })

  console.warn('Roles and permissions have been seeded successfully.')
}
