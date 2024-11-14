import { mkdir, readdir, readFile, unlink } from 'node:fs/promises'
import { join } from 'node:path'
import { write } from 'bun'
import mime from 'mime-types'
import { slugify } from '../utils/slugify'

async function uploadFile(c) {
  const formData = await c.req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return c.json({ error: 'No file uploaded' }, 400)
  }

  const year = new Date().getFullYear().toString()
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0')
  const fileType = mime.extension(file.type) || 'unknown'
  const dirPath = join('uploads', year, month, fileType)

  await mkdir(dirPath, { recursive: true })

  const slugifiedFileName = slugify(file.name)
  const filePath = join(dirPath, slugifiedFileName)
  await write(filePath, await file.arrayBuffer())

  return c.json({ message: 'File uploaded successfully', path: filePath })
}

async function listFiles(c) {
  const { year, month, typeFile } = c.req.query()

  if (!year || !typeFile) {
    return c.json({ error: 'Year and typeFile are required' }, 400)
  }

  try {
    let files: string[] = []

    if (month) {
      const dirPath = join('uploads', year, month, typeFile)
      files = await readdir(dirPath)
    }
    else {
      const months = await readdir(join('uploads', year), { withFileTypes: true })
      for (const dir of months) {
        if (dir.isDirectory()) {
          const monthFiles = await readdir(join('uploads', year, dir.name, typeFile))
          files = files.concat(monthFiles.map(file => `${dir.name}/${file}`))
        }
      }
    }

    return c.json({ files })
  }
  catch {
    return c.json({ error: 'Directory not found' }, 404)
  }
}

async function listDates(c) {
  try {
    const years = await readdir('uploads', { withFileTypes: true })
    const result: { [year: string]: string[] } = {}

    for (const yearDir of years) {
      if (yearDir.isDirectory()) {
        const year = yearDir.name
        const months = await readdir(join('uploads', year), { withFileTypes: true })
        result[year] = months.filter(monthDir => monthDir.isDirectory()).map(monthDir => monthDir.name)
      }
    }

    return c.json({ dates: result })
  }
  catch (error: any) {
    console.error(`Error reading directories: ${error.message}`)
    return c.json({ error: 'Error reading directories' }, 500)
  }
}

async function findFileInYear(year: string, typeFile: string, fileName: string): Promise<string | null> {
  const yearDir = join('uploads', year)
  const months = await readdir(yearDir, { withFileTypes: true })

  for (const dir of months) {
    if (dir.isDirectory()) {
      const monthDir = join(yearDir, dir.name, typeFile)
      try {
        const files = await readdir(monthDir)
        if (files.includes(fileName)) {
          return join(monthDir, fileName)
        }
      }
      catch {
        // Continue searching in other directories
      }
    }
  }
  return null
}

async function downloadFile(c) {
  const { year, month, typeFile, fileName } = c.req.query()

  if (!year || !typeFile || !fileName) {
    return c.json({ error: 'Year, typeFile, and fileName are required' }, 400)
  }

  const decodedFileName = decodeURIComponent(fileName)
  let filePath: string

  if (month) {
    const dirPath = join('uploads', year, month, typeFile)
    filePath = join(dirPath, decodedFileName)
  }
  else {
    filePath = await findFileInYear(year, typeFile, decodedFileName) || ''
  }

  if (!filePath) {
    return c.json({ error: 'File not found' }, 404)
  }

  try {
    const fileContent = await readFile(filePath)
    const mimeType = mime.lookup(filePath) || 'application/octet-stream'

    return new Response(fileContent, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${decodedFileName}"`,
      },
    })
  }
  catch (error: any) {
    console.error(`Error reading file: ${error.message}`)
    return c.json({ error: 'File not found' }, 404)
  }
}

async function deleteFile(c) {
  const { path } = c.req.query()

  if (!path) {
    return c.json({ error: 'File path is required' }, 400)
  }

  try {
    await unlink(path)
    return c.json({ message: 'File deleted successfully' })
  }
  catch {
    return c.json({ error: 'File not found' }, 404)
  }
}

export const fileService = {
  uploadFile,
  listFiles,
  listDates,
  downloadFile,
  deleteFile,
}
