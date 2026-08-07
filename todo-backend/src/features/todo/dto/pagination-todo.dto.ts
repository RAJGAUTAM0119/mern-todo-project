import { Types } from "mongoose";

enum TodoPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

export interface PaginationDTO {
  userId: Types.ObjectId,
  priority?: TodoPriority | TodoPriority.HIGH,
  completed?: boolean,
  page?: number | 1,
  limit?: number | 1
}