import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { spawn } from 'bun'
/**
 * Utility function to read process output.
 * @param reader - The stream reader (stdout or stderr).
 * @returns {Promise<string>} - The accumulated output as a string.
 */
async function readStream(reader: ReadableStreamDefaultReader<Uint8Array>): Promise<string> {
  const decoder = new TextDecoder()
  let output = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done)
      break
    output += decoder.decode(value)
  }
  return output
}

/**
 * General function to run a Prisma command using Bun's spawn.
 * @param cmdArgs - Array of command arguments for Prisma CLI.
 * @returns {Promise<{ success: boolean, message: string }>} The result of the command execution.
 */
async function runPrismaCommand(cmdArgs: string[]): Promise<{ success: boolean, message: string }> {
  try {
    const proc = spawn({
      cmd: ['bun', 'prisma', ...cmdArgs],
      stdout: 'pipe',
      stderr: 'pipe',
    })

    const output = await readStream(proc.stdout.getReader())
    const errorOutput = await readStream(proc.stderr.getReader())
    const exitCode = await proc.exited

    return exitCode === 0
      ? { success: true, message: output }
      : { success: false, message: errorOutput }
  }
  catch (error: any) {
    console.error(`Error executing prisma ${cmdArgs.join(' ')}:`, error)
    return { success: false, message: error.message }
  }
}

/**
 * Function to run Prisma db pull, followed by Prisma generate.
 */
export async function runDbPull(): Promise<{ success: boolean, message: string }> {
  const pullResult = await runPrismaCommand(['db', 'pull'])
  if (!pullResult.success)
    return pullResult

  const generateResult = await runPrismaGenerate()
  return generateResult.success
    ? { success: true, message: pullResult.message }
    : { success: false, message: `Generate failed: ${generateResult.message}` }
}

/**
 * Function to run Prisma generate.
 */
export async function runPrismaGenerate() {
  try {
    return await runPrismaCommand(['generate'])
  }
  catch (error: any) {
    console.error('Error running prisma generate:', error)
    return { success: false, message: error.message }
  }
}

/**
 * Function to apply migrations in production.
 */
export async function runPrismaMigrateDeploy() {
  return await runPrismaCommand(['migrate', 'deploy'])
}

/**
 * Function to run Prisma format.
 */
export async function runPrismaFormat() {
  try {
    return await runPrismaCommand(['format'])
  }
  catch (error: any) {
    console.error('Error running prisma format:', error)
    return { success: false, message: error.message }
  }
}

export async function runDbPush() {
  try {
    return await runPrismaCommand(['db', 'push', '--accept-data-loss'])
  }
  catch (error: any) {
    console.error('Error running db push:', error)
    return { success: false, message: error.message }
  }
}
