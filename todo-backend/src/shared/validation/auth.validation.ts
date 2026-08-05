import { z, ZodObject } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(3).max(50).trim(),
  email: z.email().trim(),
  password: z.string().min(8)
})

export const loginSchema = z.object({
  email: z.email().trim(),
  password: z.string().min(8)
})