import { Buffer } from 'node:buffer'
import { DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, ListObjectsV2Command, ListObjectVersionsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getContext } from 'hono/context-storage'
import mime from 'mime-types'
import { formatSize } from '../utils/formatSize'
import { getEnvVariable } from '../utils/getEnvVariable'
import { slugify } from '../utils/slugify'

export const s3Client = new S3Client({
  region: getEnvVariable('STORAGE_REGION'),
  endpoint: getEnvVariable('STORAGE_ENDPOINT'),
  credentials: {
    accessKeyId: getEnvVariable('STORAGE_ACCESS_KEY'),
    secretAccessKey: getEnvVariable('STORAGE_SECRET_KEY'),
  },
  forcePathStyle: true,
})
/**
 * Generates the file path in the format `year/month/type/file-name`.
 * @param file Uploaded file.
 * @returns Path in the format for S3.
 */
function generateObjectKey(file: File): string {
  const year = new Date().getFullYear().toString()
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0')
  const fileType = mime.extension(file.type) || 'unknown'
  const slugifiedFileName = slugify(file.name)

  return `${year}/${month}/${fileType}/${slugifiedFileName}`
}

/**
 * Uploads a file to S3 (MinIO).
 * @param c Request context.
 * @returns JSON response with the upload status.
 */
export async function uploadFile(c) {
  try {
    const user = c.get('user')
    if (!user) {
      return c.json({ error: 'User not found' }, 401)
    }

    const formData = await c.req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return c.json({ error: 'No file uploaded' }, 400)
    }

    const objectKey = generateObjectKey(file)
    const serializedUser = JSON.stringify(user)

    if (serializedUser.length > 2000) {
      return c.json(
        { error: 'User metadata exceeds 2 KB limit for S3 metadata' },
        400,
      )
    }

    const putObjectResponse = await s3Client.send(
      new PutObjectCommand({
        Bucket: getEnvVariable('STORAGE_BUCKET_NAME'),
        Key: objectKey,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
        Metadata: {
          user: serializedUser,
        },
      }),
    )

    const versionId = putObjectResponse.VersionId

    return c.json({
      message: `File uploaded successfully to S3 ${getEnvVariable('STORAGE_BUCKET_NAME')}`,
      path: objectKey,
      versionId,
    })
  }
  catch (error: any) {
    console.error(`Error uploading file to S3: ${error.message}`)
    return c.json({ error: `S3 upload failed: ${error.message}` }, 500)
  }
}
export async function listFiles(c) {
  const { year, month, typeFile } = c.req.query()

  if (!year || !typeFile) {
    return c.json({ error: 'Year and typeFile are required' }, 400)
  }

  const prefix = month ? `${year}/${month}/${typeFile}/` : `${year}/`

  try {
    const response = await s3Client.send(
      new ListObjectVersionsCommand({
        Bucket: getEnvVariable('STORAGE_BUCKET_NAME'),
        Prefix: prefix,
      }),
    )

    const groupedFiles = {};

    (response.Versions || []).forEach((item) => {
      if (!item.Key)
        return

      if (!groupedFiles[item.Key]) {
        groupedFiles[item.Key] = []
      }

      groupedFiles[item.Key].push({
        versionId: item.VersionId,
        size: formatSize(item.Size || 0),
        lastModified: item.LastModified?.toISOString(),
        isLatest: item.IsLatest,
      })
    })

    const result = Object.keys(groupedFiles).map(key => ({
      file: key,
      versions: groupedFiles[key],
    }))

    return c.json({ files: result })
  }
  catch (error: any) {
    console.error(`Error listing files from S3: ${error.message}`)
    return c.json({ error: 'Failed to list files from S3' }, 500)
  }
}

export async function listDates(c) {
  const { sub } = c.req.query()

  try {
    const result: { [year: string]: string[] } = {}

    const response = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: getEnvVariable('STORAGE_BUCKET_NAME'),
      }),
    )

    const objects = response.Contents || []

    for (const object of objects) {
      if (!object.Key)
        continue

      const headResponse = await s3Client.send(
        new HeadObjectCommand({
          Bucket: getEnvVariable('STORAGE_BUCKET_NAME'),
          Key: object.Key,
        }),
      )

      const userMetadata = headResponse.Metadata?.user
        ? JSON.parse(headResponse.Metadata.user)
        : null

      if (userMetadata?.sub === sub) {
        const [year, month] = object.Key.split('/')

        if (year && month) {
          if (!result[year]) {
            result[year] = []
          }

          if (!result[year].includes(month)) {
            result[year].push(month)
          }
        }
      }
    }

    return c.json({ dates: result })
  }
  catch (error: any) {
    console.error(`Error listing dates from S3: ${error.message}`)
    return c.json({ error: 'Error listing dates from S3' }, 500)
  }
}

export async function getFileByPath(c) {
  const { path } = c.req.query()

  if (!path) {
    return c.json({ error: 'File path is required' }, 400)
  }

  try {
    // Fetch all versions of the file with the given path
    const response = await s3Client.send(
      new ListObjectVersionsCommand({
        Bucket: getEnvVariable('STORAGE_BUCKET_NAME'),
        Prefix: path, // Specify the path to search for all versions
      }),
    )

    const versions = (response.Versions || []).map(item => ({
      versionId: item.VersionId,
      size: formatSize(item.Size || 0),
      lastModified: item.LastModified?.toISOString(),
      isLatest: item.IsLatest,
    }))

    if (versions.length === 0) {
      return c.json({ error: 'File not found' }, 404)
    }

    return c.json({
      file: path,
      versions,
    })
  }
  catch (error: any) {
    console.error(`Error fetching file details from S3: ${error.message}`)
    return c.json({ error: 'Failed to fetch file details from S3' }, 500)
  }
}

/**
 * Downloads a file from the S3 bucket.
 * If `versionId` is provided, the specified version of the file will be downloaded.
 * Otherwise, the latest version (`isLatest: true`) will be downloaded.
 *
 *
 * @query {string} path - The full path to the file in the S3 bucket. Expected format: `<year>/<month>/<type>/<filename>`.
 *                      Example: `2024/11/pdf/my-file.pdf`.
 * @query {string} [versionId] - (Optional) The unique identifier of the file version to download.
 *                               If not provided, the latest version will be fetched.
 *                               Example: `26a5faaf-24e1-4e34-98fa-6d1b5fdbc970`.
 */
export async function downloadFile(c) {
  const { path, versionId } = c.req.query()

  if (!path) {
    return c.json({ error: 'File path is required' }, 400)
  }

  try {
    let versionToDownload = versionId

    // If no versionId is provided, fetch the latest version
    if (!versionToDownload) {
      const versionResponse = await s3Client.send(
        new ListObjectVersionsCommand({
          Bucket: getEnvVariable('STORAGE_BUCKET_NAME'),
          Prefix: path,
        }),
      )

      const latestVersion = (versionResponse.Versions || []).find(v => v.IsLatest)

      if (!latestVersion) {
        return c.json({ error: 'No latest version found for the specified file' }, 404)
      }

      versionToDownload = latestVersion.VersionId
    }

    // Fetch the file from S3 using the determined versionId
    const fileResponse = await s3Client.send(
      new GetObjectCommand({
        Bucket: getEnvVariable('STORAGE_BUCKET_NAME'),
        Key: path,
        VersionId: versionToDownload,
      }),
    )

    const fileStream = fileResponse.Body

    if (!fileStream) {
      return c.json({ error: 'Failed to fetch file content from S3' }, 404)
    }

    const readableStream = fileStream.transformToWebStream()

    // Return the file as a downloadable response
    return new Response(readableStream, {
      headers: {
        'Content-Type': fileResponse.ContentType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${path.split('/').pop()}"`,
      },
    })
  }
  catch (error: any) {
    console.error(`Error downloading file from S3: ${error.message}`)
    return c.json({ error: 'Failed to download file from S3' }, 500)
  }
}
/**
 * Deletes a file from the S3 bucket.
 * If `versionId` is provided, the specified version of the file will be deleted.
 * Otherwise, the latest version (`isLatest: true`) will be deleted.
 *
 * @query {string} path - The full path to the file in the S3 bucket. Expected format: `<year>/<month>/<type>/<filename>`.
 *                      Example: `2024/11/pdf/my-file.pdf`.
 * @query {string} [versionId] - (Optional) The unique identifier of the file version to delete.
 *                               If not provided, the latest version will be deleted.
 *                               Example: `26a5faaf-24e1-4e34-98fa-6d1b5fdbc970`.
 */
export async function deleteFile(c) {
  const { path, versionId } = c.req.query()

  if (!path) {
    return c.json({ error: 'File path is required' }, 400)
  }

  try {
    let versionToDelete = versionId

    // If no versionId is provided, find the latest version
    if (!versionToDelete) {
      const versionResponse = await s3Client.send(
        new ListObjectVersionsCommand({
          Bucket: getEnvVariable('STORAGE_BUCKET_NAME'),
          Prefix: path,
        }),
      )

      const latestVersion = (versionResponse.Versions || []).find(v => v.IsLatest)

      if (!latestVersion) {
        return c.json({ error: 'No latest version found for the specified file' }, 404)
      }

      versionToDelete = latestVersion.VersionId
    }

    // Delete the file or specific version from S3
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: getEnvVariable('STORAGE_BUCKET_NAME'),
        Key: path,
        VersionId: versionToDelete,
      }),
    )

    return c.json({
      message: `File successfully deleted`,
      file: path,
      versionId: versionToDelete,
    })
  }
  catch (error: any) {
    console.error(`Error deleting file from S3: ${error.message}`)
    return c.json({ error: 'Failed to delete file from S3' }, 500)
  }
}

/**
 * Fetches and displays a specific version of a file from the S3 bucket.
 *
 * @query {string} path - The full path to the file in the S3 bucket.
 * @query {string} versionId - The unique identifier of the file version to fetch.
 */
export async function getFileVersion(c) {
  const { path, versionId } = c.req.query()

  if (!path || !versionId) {
    return c.json({ error: 'File path and versionId are required' }, 400)
  }

  try {
    const fileResponse = await s3Client.send(
      new GetObjectCommand({
        Bucket: getEnvVariable('STORAGE_BUCKET_NAME'),
        Key: path,
        VersionId: versionId,
      }),
    )

    const fileStream = fileResponse.Body

    if (!fileStream) {
      return c.json({ error: 'Failed to fetch file content from S3' }, 404)
    }

    const readableStream = fileStream.transformToWebStream()

    // Return the file as a downloadable response
    return new Response(readableStream, {
      headers: {
        'Content-Type': fileResponse.ContentType || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${path.split('/').pop()}"`,
      },
    })
  }
  catch (error: any) {
    console.error(`Error fetching file version from S3: ${error.message}`)
    return c.json({ error: 'Failed to fetch file version from S3' }, 500)
  }
}

export const fileService = {
  uploadFile,
  listFiles,
  listDates,
  downloadFile,
  deleteFile,
  getFileByPath,
  getFileVersion,
}
