import { spawn } from 'bun'

/**
 * Function to run the Prisma db pull using Bun's spawn.
 *
 * @returns {Promise<{ success: boolean, message: string }>} The result of the command execution.
 */
export async function runDbPull(): Promise<{ success: boolean, message: string }> {
  try {
    const proc = spawn({
      cmd: ['bun', 'prisma', 'db', 'pull'],
      stdout: 'pipe',
      stderr: 'pipe',
    })

    let output = ''
    let errorOutput = ''

    // Use getReader to handle ReadableStream<Uint8Array>
    const reader = proc.stdout.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }
      output += decoder.decode(value)
    }

    const errorReader = proc.stderr.getReader()
    while (true) {
      const { done, value } = await errorReader.read()
      if (done) {
        break
      }
      errorOutput += decoder.decode(value)
    }

    const exitCode = await proc.exited

    if (exitCode === 0) {
      const generateResult = await runPrismaGenerate()
      if (!generateResult.success) {
        return { success: false, message: `Generate failed: ${generateResult.message}` }
      }
      return { success: true, message: output }
    }
    else {
      console.error('Error during db pull:', errorOutput)
      return { success: false, message: errorOutput }
    }
  }
  catch (error: any) {
    console.error('Error executing db pull:', error)
    return { success: false, message: error.message }
  }
}

/**
 * Function to run the Prisma generate using Bun's spawn.
 *
 * @returns {Promise<{ success: boolean, message: string }>} The result of the command execution.
 */
export async function runPrismaGenerate(): Promise<{ success: boolean, message: string }> {
  try {
    const proc = spawn({
      cmd: ['bun', 'prisma', 'generate'],
      stdout: 'pipe',
      stderr: 'pipe',
    })

    let output = ''
    let errorOutput = ''

    // Reading stdout
    const reader = proc.stdout.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done)
        break
      output += decoder.decode(value)
    }

    // Reading stderr
    const errorReader = proc.stderr.getReader()
    while (true) {
      const { done, value } = await errorReader.read()
      if (done)
        break
      errorOutput += decoder.decode(value)
    }

    const exitCode = await proc.exited

    if (exitCode === 0) {
      return { success: true, message: output }
    }
    else {
      console.error('Error during prisma generate:', errorOutput)
      return { success: false, message: errorOutput }
    }
  }
  catch (error: any) {
    console.error('Error executing prisma generate:', error)
    return { success: false, message: error.message }
  }
}
