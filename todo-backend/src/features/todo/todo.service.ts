import { Document, Types } from "mongoose";
import { AppError } from "../../shared/errors/AppError.ts";
import { CreateTodoDTO } from "./dto/create-todo.dto.ts";
import { createTodoRepository, getTodoRepo } from "./todo.repository.ts";

export const createTodoService = async (todoData: CreateTodoDTO, user: Document | undefined) => {
  const createTodoRepo = await createTodoRepository(todoData, user)
  if (!createTodoRepo) {
    throw new AppError(400, "Repository is not working correctly")
  }

  return createTodoRepo
}

export const getTodosService = async (userId: Types.ObjectId) => {
  const todos = await getTodoRepo(userId)
  if (!todos) {
    throw new AppError(401, "Repository is not working correctly")
  }
  return todos
}