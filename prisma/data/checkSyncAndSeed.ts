import { PrismaClient } from '@prisma/client'
import { spawn } from 'bun'

const prisma = new PrismaClient()

async function runCommand(command: string[], description: string) {
  console.warn(`Running: ${description}`)
  const proc = spawn({
    cmd: command,
    stdout: 'pipe',
    stderr: 'pipe',
  })

  const processStream = async (stream: ReadableStream<Uint8Array> | undefined, label: string) => {
    if (!stream)
      return
    const reader = stream.getReader()
    const decoder = new TextDecoder()
    while (true) {
      const { value, done } = await reader.read()
      if (done)
        break
      console.warn(`[${label}]: ${decoder.decode(value)}`)
    }
  }

  await Promise.all([
    processStream(proc.stdout, 'stdout'),
    processStream(proc.stderr, 'stderr'),
  ])

  const exitCode = await proc.exited
  if (exitCode !== 0) {
    throw new Error(`Process failed with exit code ${exitCode}`)
  }

  console.warn(`${description} completed successfully.`)
}

async function checkAndSyncTable() {
  const tableName = 'back3nd_user'

  const tableExists = await prisma.$queryRawUnsafe<boolean>(`
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables 
      WHERE table_name = '${tableName}'
    )
  `)

  if (!tableExists) {
    console.warn(`Table '${tableName}' does not exist. Syncing schema with 'prisma db push'...`)

    await runCommand(['bun', 'prisma', 'db', 'push'], 'prisma db push')

    console.warn(`Schema synced, and missing tables created.`)
  }
  else {
    console.warn(`Table '${tableName}' already exists. No sync needed.`)
  }
}

async function seedDatabase() {
  console.warn(`Running database seed...`)
  await runCommand(['bun', 'run', 'prisma:seed'], 'Database seeding')
}

async function main() {
  try {
    await checkAndSyncTable()
    await seedDatabase()
  }
  catch (e) {
    console.error('Error:', e)
  }
  finally {
    await prisma.$disconnect()
  }
}

main()
