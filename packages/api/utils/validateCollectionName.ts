import { z } from 'zod'

const collectionNameSchema = z.string().regex(/^\w+$/).min(1).max(64)

/**
 * Validates the collection name against a predefined schema.
 * The collection name must be a non-empty string containing only alphanumeric characters and underscores,
 * and must be between 1 and 64 characters long.
 *
 * @param collectionName - The name of the collection to be validated.
 * @returns A boolean indicating whether the collection name is valid or not.
 */
export function isValidCollectionName(collectionName: string): boolean {
  const result = collectionNameSchema.safeParse(collectionName)
  return result.success
}
