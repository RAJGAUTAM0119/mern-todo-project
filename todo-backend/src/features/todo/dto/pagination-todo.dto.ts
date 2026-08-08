import { Types } from "mongoose";

export enum TodoPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export interface PaginationDTO {
  userId: Types.ObjectId;
  priority?: TodoPriority;
  completed?: boolean;
  page?: number;
  limit?: number;
}