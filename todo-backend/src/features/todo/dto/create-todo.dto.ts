import { TodoPriority } from "../todo.model.ts";

export interface CreateTodoDTO {
  title: string,
  description: string,
  priority: TodoPriority,
  dueDate: Date,
}