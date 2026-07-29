import { NextFunction, Request, Response } from "express";
import { findUserById } from "../../features/auth/auth.repository.ts";
import { verifyAccessToken } from "../utils/jwt.utils.ts";
import { AppError } from "../errors/AppError.ts";
import { tokenPayload } from "../types/jwt.types.ts";
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

  const authorizationHeader = (values: string): string => {
    const value = req.headers.authorization?.split(' ')
    if (!value) {
      throw new AppError(401, "Access Denied")
    }
    const valueInArray = value?.forEach((values) => {
      console.log(values)
      if (values === "Bearer") {
        return values
      }
      if (values.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")) {
        return values
      }
    })
    console.log(valueInArray)

    return ""
  }
  const bearer = authorizationHeader("Bearer")
  if (bearer !== 'Bearer') {
    throw new AppError(401, "No Bearer")
  }

  const accessToken = authorizationHeader("")

  const decoded: tokenPayload = verifyAccessToken(accessToken)
  const { userId } = decoded

  const user = await findUserById(userId)
  if (!user) {
    throw new AppError(401, "User can't be set")
  }
  req.user = user


  return next()
}