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
  accessToken: z.string().openapi({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token generated after successful registration',
  }),
  refreshToken: z.string().openapi({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT refresh token generated after successful registration',
  }),
}).openapi({ description: 'Response schema for a successful user registration' })
