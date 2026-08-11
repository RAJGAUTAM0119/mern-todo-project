import { Document, Types } from "mongoose";
import { AppError } from "../../shared/errors/AppError.ts";
import { CreateTodoDTO } from "./dto/create-todo.dto.ts";
import { createTodoRepository, deleteTodoRepo, getTodoRepo, updateTodoRepo } from "./todo.repository.ts";
import { UpdateData } from "../../shared/types/update_todo.type.ts";
import { TodoQueryDTO } from "./dto/todo-query.dto.ts";

export const createTodoService = async (todoData: CreateTodoDTO, user: Document | undefined) => {
  const createTodoRepo = await createTodoRepository(todoData, user)
  if (!createTodoRepo) {
    throw new AppError(400, "Repository is not working correctly")
  }

  return createTodoRepo
}

export const getTodosService = async (getTodo: TodoQueryDTO) => {

  const todos = await getTodoRepo(getTodo)

  if (!todos) {
    throw new AppError(401, "Repository is not working correctly")
  }

  return todos
}

export const updateTodoService = async (updateTodo: UpdateData) => {
  const { todoId, userId, update } = updateTodo
  const updateTodoService = await updateTodoRepo({ todoId, userId, update })
  if (!updateTodoService) {
    throw new AppError(400, "Repository is not working properly")
  }
  return updateTodoService
}

export const deleteTodoService = async (updateTodo: UpdateData) => {
  const { userId, todoId } = updateTodo
  const deleteTodoService = await deleteTodoRepo({ userId, todoId })
  if (!deleteTodoService) {
    throw new AppError(400, ' Repository is not woring after calling from service')
  }
  return deleteTodoService
}