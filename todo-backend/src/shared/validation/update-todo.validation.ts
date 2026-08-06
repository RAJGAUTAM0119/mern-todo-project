import { z, ZodObject } from 'zod'

export const updateTodoSchema = z.object({
  title: z.nullable(z.string().trim().min(3).max(100)),
  description: z.nullable(z.string().trim().max(500)),
  completed: z.nullable(z.boolean().default(false)),
  priority: z.nullable(z.string().default("MEDIUM")),
  dueDate: z.nullable(z.iso.datetime())
})