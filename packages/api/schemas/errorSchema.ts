// src/schemas/errorSchema.ts
import { z } from '@hono/zod-openapi'

export const ErrorSchema = z.object({
  message: z.string().optional().openapi({
    example: 'Invalid email',
    description: 'A general error message for the response',
  }),
  error: z.string().optional().openapi({
    example: 'User or role not found',
    description: 'A specific error description for the response',
  }),
}).openapi({ description: 'Standard error response schema for API' })
