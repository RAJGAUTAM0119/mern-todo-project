import { NextFunction, Request, Response } from "express";
import { findUserById } from "../../features/auth/auth.repository.ts";
import { verifyAccessToken } from "../utils/jwt.utils.ts";

export const protectedMiddleware = async (req: Request, res:
  Response, next: NextFunction
) => {

  const decoded = verifyAccessToken(req)
  const { userId } = decoded

  req.user = await findUserById(userId)

  next()
}