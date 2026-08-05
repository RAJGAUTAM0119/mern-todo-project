import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError.ts'
import { ZodObject } from 'zod'

export const validateMiddleware = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction,) => {
    const validation = schema.safeParse(req.body)

    if (!validation.success) {
      throw new AppError(400, "Validation Error")
    }
    next()
  }
}