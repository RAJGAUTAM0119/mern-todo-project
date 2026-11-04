import mongoose, { Document } from "mongoose";
import { ITodo } from "./todo.model.ts";
import { CreateTodoDTO } from "./dto/createTodo.dto.ts";
import { todoModel } from "./todo.model.ts";
import { AppError } from "../../shared/errors/AppError.ts";
import { UpdateData } from "../../shared/types/updateTodo.type.ts";
import { TodoQueryDTO } from "./dto/todoQuery.dto.ts";


export const createTodoRepository = async (todoData: CreateTodoDTO, user: Document | undefined) => {
  const { description, dueDate, priority, title } = todoData
  if (!user) {
    throw new AppError(401, "Unauthorized")
  }
  const userId = user._id
  return await todoModel.create({ description, dueDate, priority, title, userId })
}

export const getTodoRepo = async (getTodo: TodoQueryDTO) => {
  const {
    userId,
    completed,
    limit,
    page,
    priority,
    order,
    sort,
    search
  } = getTodo;

  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 10;
  const MAX_LIMIT = 100;

  const requestedPage = page ?? DEFAULT_PAGE;
  const requestedLimit = limit ?? DEFAULT_LIMIT;


  if (
    !Number.isSafeInteger(requestedPage) ||
    requestedPage < 1 ||
    !Number.isSafeInteger(requestedLimit) ||
    requestedLimit < 1
  ) {
    throw new AppError(400, "There is pagination error");
  }

  const LIMIT = Math.min(requestedLimit, MAX_LIMIT);
  const SKIP = (requestedPage - 1) * LIMIT;

  if (!Number.isSafeInteger(SKIP)) {
    throw new AppError(400, "There is pagination error");
  }

  const direction = order === "asc" ? 1 : -1;

  const sorting: Record<string, 1 | -1> = {};
  if (sort) {
    sorting[sort] = direction;
  }
  sorting._id = direction;

  const filter: mongoose.QueryFilter<ITodo> = {
    userId
  };

  if (completed !== undefined) {
    filter.completed = completed;
  }

  if (priority !== undefined) {
    filter.priority = priority;
  }

  if (search !== undefined && search.trim() !== '') {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const results = await todoModel
    .find(filter)
    .sort(sorting)
    .skip(SKIP)
    .limit(LIMIT)
    .exec();

  return results;
};

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
    throw new AppError(404, "Todo not found")
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
    throw new AppError(404, "Todo not found")
  }
  return deleteTodo
}