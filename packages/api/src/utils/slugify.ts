export function slugify(text: string): string {
  const [name, extension] = text.split('.')
  const slugifiedName = name
    .toString()
    .normalize('NFD') // Normalize to decompose accented characters
    .replace(/[\u0300-\u036F]/g, '') // Remove accents
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\-]/g, '') // Remove special characters
    .replace(/-+/g, '-') // Remove duplicate hyphens
    .replace(/^-+/, '') // Remove hyphens from the start
    .replace(/-+$/, '') // Remove hyphens from the end

  return `${slugifiedName}.${extension}`
}
