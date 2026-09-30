import { NextFunction, Request, Response } from 'express'
import { AppError } from '../errors/AppError.ts'
import { ZodType } from 'zod'

export const validateMiddleware = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.safeParse(req.body)
    if (!validation.success) {
      throw new AppError(400, "Validation Error")
    }
    req.body = validation.data
    next()
  }
}