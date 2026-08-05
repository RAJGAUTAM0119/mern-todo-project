import { priority } from "../todo.model.ts";

export interface CreateTodoDTO {
  title: string,
  description: string,
  priority: priority,
  dueDate: Date,
}