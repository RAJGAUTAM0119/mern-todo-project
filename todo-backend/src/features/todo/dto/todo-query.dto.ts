import { Types } from "mongoose";

export enum TodoPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

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