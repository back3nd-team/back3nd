import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { runDbPush, runPrismaFormat, runPrismaGenerate } from './prismaService'

const prismaDirectory = './prisma/schema'

export async function listPrismaFiles(): Promise<string[]> {
  try {
    const files = await readdir(prismaDirectory)
    return files.filter(file => file.endsWith('.prisma') && file !== 'schema.prisma')
  }
  catch (error) {
    console.error(`Failed to list Prisma files: ${error}`)
    return []
  }
}

export async function readPrismaFile(filename: string): Promise<string> {
  const filePath = join(prismaDirectory, filename)
  try {
    const file = Bun.file(filePath)
    const content = await file.text()
    return btoa(content)
  }
  catch (error) {
    console.error(`Failed to read Prisma file (${filename}): ${error}`)
    throw new Error(`Could not read the file: ${filename}`)
  }
}
async function writeFile(filePath: string, content: string): Promise<void> {
  try {
    await Bun.write(filePath, content)
    await runPrismaFormat()
  }
  catch (error) {
    console.error(`Failed to write file (${filePath}): ${error}`)
    throw new Error(`Could not write the file: ${filePath}`)
  }
}
export async function savePrismaFile(filename: string, content: string): Promise<{ success: boolean, message?: string }> {
  const filePath = join(prismaDirectory, filename)
  const backupFile = await readPrismaFile(filename)
  await writeFile(filePath, content)

  const pushToDb = await runDbPush()
  if (!pushToDb.success) {
    await writeFile(filePath, atob(backupFile))
    return { success: false, message: pushToDb.message }
  }
  const generateResult = await runPrismaGenerate()
  if (!generateResult.success) {
    await writeFile(filePath, atob(backupFile))
    return { success: false, message: `Generate failed: ${generateResult.message}` }
  }
  return { success: true }
}
