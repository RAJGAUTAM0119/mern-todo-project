import { NextFunction, Request, Response } from "express";
import { findUserById } from "../../features/auth/auth.repository.ts";
import { verifyAccessToken } from "../utils/jwt.utils.ts";
import { AppError } from "../errors/AppError.ts";
import { UserRole } from "../../features/auth/user.model.ts";

declare global {
  namespace Express {
    interface Request {
      user?: any
    }
  }
}
export interface tokenPayload {
  userId: string;
  role: UserRole;
  email: string;
}


export const protectedMiddleware = async (req: Request, res:
  Response, next: NextFunction
) => {

  const authorizationHeader = (index: number): string => {
    const value = req.headers.authorization?.split(' ')[index]
    if (!value) {
      throw new AppError(401, "Access Denied")
    }
    return value
  }

  const bearer = authorizationHeader(0)
  if (bearer !== 'Bearer') {
    throw new AppError(401, "No Bearer")
  }

  const accessToken = authorizationHeader(1)

  const decoded: tokenPayload = verifyAccessToken(accessToken)
  const { userId } = decoded

  const user = await findUserById(userId)
  if (!user) {
    throw new AppError(401, "User can't be set")
  }
  req.user = user


  return next()
}