import { Document, Types } from "mongoose";
import { CreateTodoDTO } from "./dto/create-todo.dto.ts";
import { userTodo } from "./todo.model.ts";
import { AppError } from "../../shared/errors/AppError.ts";
import { UpdateData } from "./todo.controller.ts";


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

export const updateTodoRepo = async (updateData: UpdateData) => {
  const { todoId, userId, update } = updateData
  const updateTodo = await userTodo.findOneAndUpdate(
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
  const deleteTodo = await userTodo.findOneAndDelete(
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