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
    const content = await c.req.text()
    try {
      await savePrismaFile(filename, content)
      return c.json({ success: true })
    }
    catch (error: any) {
      return c.json({ error: 'Failed to save file', message: error.message }, 500)
    }
  }
}
