import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function checkTableExists(collectionName: string): Promise<boolean> {
  const result = await prisma.$queryRawUnsafe<boolean>(`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_name = '${collectionName}'
    )
  `)
  return result
}

export async function createCollectionInDB(collectionName: string, primaryKeyField: string, type: string): Promise<boolean> {
  const createTableQuery = `
    CREATE TABLE ${collectionName} (
      ${primaryKeyField} ${type} PRIMARY KEY
    )
  `
  const result = await prisma.$executeRawUnsafe(createTableQuery)
  return result !== undefined
}

export async function createEntityWithPermission(roles: string[], entityName: string): Promise<boolean> {
  try {
    const newEntity = await prisma.back3nd_entity.create({
      data: {
        name: entityName,
      },
    })
    for (const role of roles) {
      if (role && typeof role === 'string') {
        await prisma.back3nd_permission.create({
          data: {
            role_id: role,
            table_id: newEntity.id,
            can_create: true,
            can_read: true,
            can_update: false,
            can_delete: false,
          },
        })
      }
    }
    return true
  }
  catch (error) {
    console.error('Error creating entity or permission:', error)
    return false
  }
}
