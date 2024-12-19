/**
 * Formats the file size into a human-readable string.
 * @param size File size in bytes.
 * @returns Formatted string (e.g., "1.2 MiB").
 */
export function formatSize(size: number): string {
  const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB']
  let index = 0

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024
    index++
  }

  return `${size.toFixed(2)} ${units[index]}`
}
