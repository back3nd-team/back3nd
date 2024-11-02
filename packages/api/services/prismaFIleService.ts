import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

const prismaDirectory = './prisma/schema'

export async function listPrismaFiles(): Promise<string[]> {
  try {
    const files = await readdir(prismaDirectory)
    return files.filter(file => file.endsWith('.prisma'))
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
    return await file.text()
  }
  catch (error) {
    console.error(`Failed to read Prisma file (${filename}): ${error}`)
    throw new Error(`Could not read the file: ${filename}`)
  }
}

export async function savePrismaFile(filename: string, content: string): Promise<void> {
  const filePath = join(prismaDirectory, filename)
  try {
    await Bun.write(filePath, content)
  }
  catch (error) {
    console.error(`Failed to save Prisma file (${filename}): ${error}`)
    throw new Error(`Could not save the file: ${filename}`)
  }
}
