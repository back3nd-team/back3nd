import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { runDbPush, runPrismaGenerate } from './prismaService'

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

export async function savePrismaFile(filename: string, content: string): Promise<void> {
  const filePath = join(prismaDirectory, filename)
  try {
    await Bun.write(filePath, content)

    const pushToDb = await runDbPush()
    if (!pushToDb.success) {
      throw new Error(`SQL migration creation failed: ${pushToDb.message}`)
    }
    const generateResult = await runPrismaGenerate()
    if (!generateResult.success) {
      throw new Error(`Prisma client generation failed: ${generateResult.message}`)
    }
  }
  catch (error: any) {
    console.error(`Failed to save Prisma file (${filename}): ${error}`)
    throw new Error(`Could not save the file: ${filename}. Error: ${error.message}`)
  }
}
