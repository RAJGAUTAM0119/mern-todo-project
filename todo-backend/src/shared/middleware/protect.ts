import { NextFunction, Request, Response } from "express";
import { findUserById } from "../../features/auth/auth.repository.ts";
import { verifyAccessToken } from "../utils/jwt.utils.ts";
import { AppError } from "../errors/AppError.ts";
import { tokenPayload } from "../types/jwt.type.ts";
import { Document } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: Document
    }
  }
}

export const protectedMiddleware = async (req: Request, res:
  Response, next: NextFunction
) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError(401, "Access Denied - no authHeader provided")
  }

  const value = authHeader?.split(' ')

  const bearerIndex = value.findIndex((part) => part === "Bearer")

  if (bearerIndex === -1) {
    throw new AppError(401, "No Bearer")
  }

  const tokenIndex = bearerIndex + 1

  if (tokenIndex >= value.length) {
    throw new AppError(401, "Invalid authorization format - No token provided after Bearer");
  }

  const accessToken = value[tokenIndex]

  const decoded: tokenPayload = verifyAccessToken(accessToken)
  const { userId } = decoded

  const user = await findUserById(userId)
  if (!user) {
    throw new AppError(401, "User can't be set")
  }

  req.user = user


  return next()
}