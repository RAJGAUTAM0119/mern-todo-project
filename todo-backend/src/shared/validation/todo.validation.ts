import { z } from 'zod'

export const todoSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.nullable(z.string().trim().max(500)),
  completed: z.boolean().default(false),
  priority: z.string().default("MEDIUM"),
  dueDate: z.iso.datetime()
})