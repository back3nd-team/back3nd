import { z } from 'zod'

export const fieldSchema = z.object({
  key: z.string()
    .min(1, 'The field key is required')
    .max(63, 'The field key must be at most 63 characters long')
    .regex(/^[a-z_]/i, 'The field key must start with a letter or underscore')
    .regex(/^\w+$/, 'The field key must contain only letters, numbers, or underscores'), // PostgreSQL-valid column name
  type: z.enum(['String', 'UUID', 'Big Integer', 'Integer', 'Float', 'Decimal', 'Text']),
  defaultValue: z.string(),
  required: z.boolean(),
  placeholder: z.string().optional(),
})
