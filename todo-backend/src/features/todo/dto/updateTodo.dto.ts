import { Types } from "mongoose";
import { TodoPriority } from "../todo.model.ts";

export interface UpdateTodoDTO {
  title?: string,
  description?: string,
  completed?: boolean,
  priority?: TodoPriority,
  dueDate?: Date,
}

