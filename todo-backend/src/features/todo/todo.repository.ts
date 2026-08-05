import { Document, Types } from "mongoose";
import { CreateTodoDTO } from "./dto/create-todo.dto.ts";
import { userTodo } from "./todo.model.ts";
import { AppError } from "../../shared/errors/AppError.ts";


export const createTodoRepository = async (todoData: CreateTodoDTO, user: Document | undefined) => {
  const { description, dueDate, priority, title } = todoData
  if (!user) {
    throw new AppError(401, "Unauthorized")
  }
  const userId = user._id
  return await userTodo.create({ description, dueDate, priority, title, userId })
}

export const getTodoRepo = async (userId: Types.ObjectId) => {
  return await userTodo.find({ userId })
}