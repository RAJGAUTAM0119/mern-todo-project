import { Types } from "mongoose";
import { UpdateTodoDTO } from "../../features/todo/dto/update-todo.dto.ts";

export interface UpdateData {
  todoId: string | string[],
  userId: Types.ObjectId | undefined,
  update?: UpdateTodoDTO
}