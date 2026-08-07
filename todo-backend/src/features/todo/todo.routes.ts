import { Router } from 'express'
import { validateMiddleware } from '../../shared/middleware/validate.ts'
import { todoSchema } from '../../shared/validation/todo.validation.ts'
import { todo } from './todo.controller.ts'
import { asyncHandler } from '../../shared/middleware/asyncHandler.ts'
import { protectedMiddleware } from '../../shared/middleware/protect.ts'
import { updateTodoSchema } from '../../shared/validation/update-todo.validation.ts'

export const todoRouter = Router()

todoRouter.post('/create-todo', protectedMiddleware, validateMiddleware(todoSchema), asyncHandler(todo.createTodo))

todoRouter.get('/get-todos', protectedMiddleware, asyncHandler(todo.getUserTodos))

// todoRouter.get('/get-todo', protectedMiddleware, asyncHandler(todo.testingTodoQuery))

// todoRouter.get('/get-todos?priority=HIGH', protectedMiddleware,)

// todoRouter.get('/get-todos?completed=true&priority=HIGH', protectedMiddleware,)

todoRouter.patch('/:todoId', protectedMiddleware, validateMiddleware(updateTodoSchema), asyncHandler(todo.updateUserTodo))

todoRouter.delete('/:todoId', protectedMiddleware, asyncHandler(todo.deleteUserTodo))