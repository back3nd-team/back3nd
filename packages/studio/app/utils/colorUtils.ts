// utils/colorUtils.ts

/**
 * Generates a numeric hash from a given string.
 * @param {string} str - The input string to hash.
 * @returns {number} A consistent numeric hash based on the input string.
 */
export function hashStringToNumber(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0 // Transforms into a 32-bit integer
  }
  return Math.abs(hash)
}

/**
 * Generates a consistent HSL color based on a permission name.
 * @param {string} permission - The permission name to generate a color for.
 * @returns {string} A string representing an HSL color.
 */
export function getPermissionColor(permission: string): string {
  const hash = hashStringToNumber(permission)
  const hue = hash % 360 // Unique hue for each permission
  return `hsl(${hue}, 60%, 70%)` // Fixed saturation and lightness for consistency
}
