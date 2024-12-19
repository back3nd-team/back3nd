export function getEnvVariable(key: string): string {
  const value = Bun.env[key]
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`)
  }
  return value
}
