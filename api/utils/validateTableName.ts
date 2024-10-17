import { z } from 'zod'

const tableNameSchema = z.string().regex(/^\w+$/).min(1).max(64)

/**
 * Validates the table name against a predefined schema.
 * The table name must be a non-empty string containing only alphanumeric characters and underscores,
 * and must be between 1 and 64 characters long.
 *
 * @param tableName - The name of the table to be validated.
 * @returns A boolean indicating whether the table name is valid or not.
 */
export function isValidTableName(tableName: string): boolean {
  const result = tableNameSchema.safeParse(tableName)
  return result.success
}
