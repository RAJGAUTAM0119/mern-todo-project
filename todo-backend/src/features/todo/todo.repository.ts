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

  let SKIP = 0
  let LIMIT = 0

  if (page && limit) {
    LIMIT = limit
    SKIP = (page - 1) * limit
  }

  if (SKIP < 0) {
    throw new AppError(400, "There is pagination error")
  }

  console.log(completed, priority)

  return await todoModel.find({ userId: userId, completed: completed, priority: priority }).skip(SKIP).limit(LIMIT)
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