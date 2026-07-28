import { Router } from "express";
import { auth } from "./auth.controller.ts";
import { asyncHandler } from "../../shared/middleware/asyncHandler.ts";
import { protectedMiddleware } from "../../shared/middleware/protect.ts";
export const authRouter = Router();

authRouter.post('/register', asyncHandler(auth.registerUser));
authRouter.post('/login', asyncHandler(auth.loginUser))
authRouter.get('/get-todos', protectedMiddleware, asyncHandler(auth.getUserTodos)
)
authRouter.post('/refresh', asyncHandler(auth.accessTokenRotation))