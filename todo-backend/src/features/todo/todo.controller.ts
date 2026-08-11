import { Request, Response } from "express";
import { createTodoService, deleteTodoService, getTodosService, updateTodoService } from "./todo.service.ts";
import { AppError } from "../../shared/errors/AppError.ts";
import { TodoQueryDTO } from "./dto/todo-query.dto.ts";



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

  if (!user) {
    throw new AppError(401, "User is not valid")
  }

  const completed =
    req.query.completed === undefined
      ? undefined
      : req.query.completed === "true";

  const page =
    typeof req.query.page === "string"
      ? Number(req.query.page)
      : 1;

  const limit =
    typeof req.query.limit === "string"
      ? Number(req.query.limit)
      : 10;

  const allowedSortFields = [
    "createdAt",
    "dueDate",
    "priority",
    "title",
  ] as const;

  const requestedSort =
    typeof req.query.sort === "string"
      ? req.query.sort
      : "dueDate";

  if (!allowedSortFields.includes(requestedSort as typeof allowedSortFields[number])) {
    throw new AppError(400, "Invalid sort field");
  }

  const priority =
    typeof req.query.priority === "string"
      ? req.query.priority
      : undefined;

  const requestedOrder =
    typeof req.query.order === "string"
      ? req.query.order
      : "asc";

  if (requestedOrder !== "asc" && requestedOrder !== "desc") {
    throw new AppError(400, "Invalid sort order");
  }

  const requestedSearch =
    (typeof req.query.search === "string" && req.query.search === "" || '' || undefined || null)
      ? undefined
      : req.query.search
  console.log(requestedSearch)

  if (!requestedSearch) {
    throw new AppError(400, "Bad Request")
  }

  const todoQuery: TodoQueryDTO = {
    userId: user._id,
    completed,
    priority,
    page,
    limit,
    sort: requestedSort,
    order: requestedOrder,
    search: requestedSearch
  };

  const userTodos = await getTodosService(todoQuery)

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


export const todo = {
  createTodo, getUserTodos, updateUserTodo, deleteUserTodo
}