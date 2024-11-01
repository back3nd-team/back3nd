// src/schemas/authSchemas.ts
import { z } from '@hono/zod-openapi'

export const RegisterSchema = z.object({
  email: z.string().email().openapi({
    example: 'user@example.com',
    description: 'User email address used for login',
  }),
  password: z.string().min(8).openapi({
    example: 'complexUserFakePass432',
    description: 'Password with at least 8 characters for user registration',
  }),
})

export const RegisterResponseSchema = z.object({
  token: z.string().openapi({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwicm9sZSI6ImM2YWZmZDhkLTZkZWUtNDE5ZS1iYTllLWI5MGI1NzM1YjY4MiIsImV4cCI6MTczMDUyMDk4MX0.CJJd9y0DB8DuOe99Db-US4BwC_KxCOCAUnfeEdoumMo',
    description: 'JWT token generated after successful registration',
  }),
}).openapi({ description: 'Response schema for a successful user registration, providing the JWT token' })
