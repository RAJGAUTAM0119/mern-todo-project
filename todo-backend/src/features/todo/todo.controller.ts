import { Request, Response } from "express";
import { createTodoService, getTodosService } from "./todo.service.ts";
import { AppError } from "../../shared/errors/AppError.ts";

const createTodo = async (req: Request, res: Response) => {
  const todoData = req.body
  const user = req.user

  const createTodo = await createTodoService(todoData, user)

  if (!createTodo) {
    throw new AppError(400, "Unable to create todo")
  }

  res.status(201).json({
    success: true,
    message: "Todo Created Succesfully",
    createTodo
  })
}

const getUserTodos = async (req: Request, res: Response) => {

  const user = req.user

  if (!user) {
    throw new AppError(401, "User is not valid")
  }
  const userId = user._id
  const userTodos = await getTodosService(userId)

  if (!userTodos) {
    throw new AppError(401, "Todo not created at this moment")
  }


  res.status(200).json({
    success: true,
    message: "Todo fetched successfully",
    userTodos
  })
}

export const todo = {
  createTodo, getUserTodos
}