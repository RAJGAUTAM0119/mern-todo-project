import { Types } from "mongoose";

import { TodoPriority } from "../todo.model.ts";

export type TodoSortFields = "createdAt" | "dueDate" | "priority" | "title"

export type SortOrder = "asc" | "desc"

export interface TodoQueryDTO {
  userId: Types.ObjectId;
  priority?: TodoPriority;
  completed?: boolean;
  page?: number;
  limit?: number;
  sort?: TodoSortFields;
  order?: SortOrder;
  search?: string
}