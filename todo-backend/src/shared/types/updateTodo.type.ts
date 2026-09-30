import { Types } from "mongoose";
import { UpdateTodoDTO } from "../../features/todo/dto/updateTodo.dto.ts";

export interface UpdateData {
  todoId: string | string[],
  userId: Types.ObjectId | undefined,
  update?: UpdateTodoDTO
}