import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.ts";

export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof AppError) {
    console.error(err)
    return res.status(err.statusCode).json({ success: false, message: err.message })
  }
  if ("type" in err && err.type === "entity.parse.failed") {
    return res.status(400).json({ success: false, message: "Invalid JSON body" })
  }
  console.error(err)
  return res.status(500).json({ success: false, message: "Internal server error" })
}