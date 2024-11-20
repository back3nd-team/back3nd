import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getTables() {
  const result = await prisma.$queryRaw<
    { table_name: string }[]
  >`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
  return result.map(row => row.table_name)
}
export async function getTable(collectionName: string) {
  const result = await prisma.$queryRaw<
    { table_name: string }[]
  >`SELECT table_name FROM information_schema.tables WHERE table_name = ${collectionName}`
  return result.length > 0 ? result[0].table_name : null
}

export async function getColumns(tableName: string) {
  const columnsResult = await prisma.$queryRaw<
    { column_name: string, data_type: string, character_maximum_length: number | null }[]
  >`SELECT column_name, data_type, character_maximum_length FROM information_schema.columns WHERE table_name = ${tableName}`

  const uniqueConstraints = await getUniqueConstraints(tableName)
  const primaryKeyColumns = await checkKey(tableName)

  return columnsResult.map(col => ({
    columnName: col.column_name,
    columnType: col.data_type,
    size: col.character_maximum_length,
    isUnique: uniqueConstraints.includes(col.column_name),
    isPrimaryKey: primaryKeyColumns.includes(col.column_name),
  }))
}

export async function checkKey(tableName: string) {
  const primaryKeyResult = await prisma.$queryRaw<
    { column_name: string }[]
  >`
        SELECT kcu.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
        WHERE tc.table_name = ${tableName}
        AND tc.constraint_type = 'PRIMARY KEY'
    `
  return primaryKeyResult.map(pk => pk.column_name)
}

export async function getUniqueConstraints(tableName: string) {
  const result = await prisma.$queryRaw<
    { column_name: string }[]
  >`
    SELECT kcu.column_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
    ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_name = ${tableName}
    AND tc.constraint_type = 'UNIQUE'
  `
  return result.map(uc => uc.column_name)
}
