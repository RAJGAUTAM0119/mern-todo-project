import { z } from 'zod'
import { TodoPriority } from '../../features/todo/todo.model.ts';

export const updateTodoSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.string().trim().max(500).nullable(),
  completed: z.boolean(),
  priority: z.enum(TodoPriority),
  dueDate: z.iso.datetime(),
}).partial();