import { priority } from "../todo.model.ts";

export interface UpdateTodoDTO {
  title?: string,
  description?: string,
  completed?: boolean,
  priority?: priority,
  dueDate?: Date,
}