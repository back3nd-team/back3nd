import type { Context } from 'hono'
import { listPrismaFiles, readPrismaFile, savePrismaFile } from '../services/prismaFIleService'

export class PrismaFileController {
  static async list(c: Context) {
    const result = await listPrismaFiles()
    return c.json(result)
  }

  static async read(c: Context) {
    const filename = c.req.param('filename')
    try {
      const encodedContent = await readPrismaFile(filename)
      return c.json({ model: encodedContent })
    }
    catch (error: any) {
      return c.json({ error: 'File not found', message: error.message }, 404)
    }
  }

  static async update(c: Context) {
    const filename = c.req.param('filename')
    const { model } = await c.req.json()
    const decodedModel = atob(model)
    const result = await savePrismaFile(filename, decodedModel)
    if (!result.success) {
      console.error('Error saving Prisma file:', result.message)
      return c.json(result)
    }

    return c.json(result)
  }
}
