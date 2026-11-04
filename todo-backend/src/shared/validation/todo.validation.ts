import { z } from 'zod'
import { TodoPriority } from '../../features/todo/todo.model.ts';

export const todoSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.string().trim().max(500).nullable().optional(),
  completed: z.boolean().default(false),
  priority: z.enum(TodoPriority).default(TodoPriority.MEDIUM),
  dueDate: z.iso.datetime().optional()
})