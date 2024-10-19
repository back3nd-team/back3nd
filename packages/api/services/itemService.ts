import { PrismaClient } from '@prisma/client'
import { isValidTableName } from '../utils/validateTableName'

const prisma = new PrismaClient()

/**
 * Service to get items from a specific table.
 * @param tableName The name of the table
 * @returns Data from the table or an error object
 */
export async function getItemsForTable(tableName: string) {
  if (!isValidTableName(tableName)) {
    return { error: 'Invalid table name', statusCode: 400 }
  }

  try {
    const data: any[] = await prisma.$queryRawUnsafe(`SELECT * FROM ${tableName}`)

    if (!data || data.length === 0) {
      return { data: [] }
    }

    return { data }
  }
  catch {
    return { error: 'Database error', statusCode: 500 }
  }
}

export async function listTablesForUser(userId: string) {
  // Buscar as roles do usuário
  const userRoles = await prisma.back3nd_user_role.findMany({
    where: {
      user_id: userId,
    },
    select: {
      role_id: true, // Pegar o ID das roles
    },
  })

  // Extrair os role_ids do usuário
  const roleIds = userRoles.map(role => role.role_id)

  // Buscar as permissões relacionadas às roles do usuário
  const permissions = await prisma.back3nd_permission.findMany({
    where: {
      role_id: {
        in: roleIds, // Verificar as permissões das roles do usuário
      },
      can_read: true, // Apenas permissões de leitura
    },
    select: {
      table: {
        select: {
          name: true, // Pegar o nome da tabela
        },
      },
    },
  })
  console.log('Permissions', permissions)
  // Extrair e retornar os nomes das tabelas permitidas
  return permissions.map(permission => permission.table.name)
}
