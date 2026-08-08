import { Document, Types } from "mongoose";
import { CreateTodoDTO } from "./dto/create-todo.dto.ts";
import { todoModel } from "./todo.model.ts";
import { AppError } from "../../shared/errors/AppError.ts";
import { UpdateData } from "../../shared/types/update_todo.type.ts";
import { PaginationDTO } from "./dto/pagination-todo.dto.ts";


export const createTodoRepository = async (todoData: CreateTodoDTO, user: Document | undefined) => {
  const { description, dueDate, priority, title } = todoData
  if (!user) {
    throw new AppError(401, "Unauthorized")
  }
  const userId = user._id
  return await todoModel.create({ description, dueDate, priority, title, userId })
}

export const getTodoRepo = async (getTodo: PaginationDTO) => {

  const { userId, completed, limit, page, priority } = getTodo



  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 10;
  const MAX_LIMIT = 100;

  const requestedPage = page ?? DEFAULT_PAGE;
  const requestedLimit = limit ?? DEFAULT_LIMIT;

  let LIMIT = requestedLimit
  let SKIP = (requestedPage - 1) * requestedLimit


  if (SKIP < 0) {
    throw new AppError(400, "There is pagination error")
  }


  const filter: Record<string, unknown> = {
    userId,
  };

  if (completed !== undefined) {
    filter.completed = completed;
  }

  if (priority !== undefined) {
    filter.priority = priority;
  }

  return await todoModel.find(filter).skip(SKIP).limit(LIMIT)
}

export const updateTodoRepo = async (updateData: UpdateData) => {
  const { todoId, userId, update } = updateData
  const updateTodo = await todoModel.findOneAndUpdate(
    {
      _id: todoId,
      userId: userId

    }, update,
    {
      returnDocument: "after"
    }
  )
  if (!updateTodo) {
    throw new AppError(400, "Fields are invalid in repository")
  }
  return updateTodo
}

export const deleteTodoRepo = async (updateData: UpdateData) => {
  const { todoId, userId } = updateData
  const deleteTodo = await todoModel.findOneAndDelete(
    {
      _id: todoId,
      userId: userId
    }
  )
  if (!deleteTodo) {
    throw new AppError(400, "something is wrong in repository")
  }
  return deleteTodo
}