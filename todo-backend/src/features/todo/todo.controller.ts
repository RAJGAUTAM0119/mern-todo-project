import { Request, Response } from "express";
import { createTodoService, deleteTodoService, getTodosService, updateTodoService } from "./todo.service.ts";
import { AppError } from "../../shared/errors/AppError.ts";



const createTodo = async (req: Request, res: Response) => {
  const todoData = req.body
  const user = req.user

  const createdTodo = await createTodoService(todoData, user)

  if (!createdTodo) {
    throw new AppError(400, "Unable to create todo")
  }

  res.status(201).json({
    success: true,
    message: "Todo Created Succesfully",
    createdTodo
  })
}

const getUserTodos = async (req: Request, res: Response) => {

  const user = req.user

  const completed = Boolean(req.query.completed)
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const priority = req.query.priority

  if (!user) {
    throw new AppError(401, "User is not valid")
  }
  const userId = user._id
  const userTodos = await getTodosService({ userId, completed, limit, page, priority })

  if (!userTodos) {
    throw new AppError(401, "Todo not created at this moment")
  }


  res.status(200).json({
    success: true,
    message: "Todo fetched successfully",
    userTodos
  })
}

const updateUserTodo = async (req: Request, res: Response) => {
  const todoId = req.params.todoId
  const userId = req.user?._id
  const update = req.body
  const todo = await updateTodoService({ todoId, userId, update })
  if (!todo) {
    throw new AppError(204, "Service is not working properly")
  }

  res.status(200).json({
    success: true,
    message: "User Updated successfully",
    todo
  })
}

const deleteUserTodo = async (req: Request, res: Response) => {
  const todoId = req.params.todoId
  const userId = req.user?._id
  const deleteTodo = await deleteTodoService({ todoId, userId })
  if (!deleteTodo) {
    throw new AppError(400, "Service is not working properly")
  }

  res.status(200).json({
    success: true,
    message: "Todo deleted successfully"
  })
}

// const testingTodoQuery = (req: Request, res: Response) => {
//   const completed = req.query.completed
//   console.log(completed)
// }

export const todo = {
  createTodo, getUserTodos, updateUserTodo, deleteUserTodo
}