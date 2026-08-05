import { Router } from "express";
import { auth } from "./auth.controller.ts";
import { asyncHandler } from "../../shared/middleware/asyncHandler.ts";
import { protectedMiddleware } from "../../shared/middleware/protect.ts";
import { validateMiddleware } from "../../shared/middleware/validate.ts";
import { loginSchema, registerSchema } from "../../shared/validation/auth.validation.ts";
export const authRouter = Router();

authRouter.post('/register', validateMiddleware(registerSchema), asyncHandler(auth.registerUser));
authRouter.post('/login', validateMiddleware(loginSchema), asyncHandler(auth.loginUser))
// authRouter.get('/get-todos', protectedMiddleware, asyncHandler(auth.getUserTodos))
authRouter.post('/refresh', asyncHandler(auth.accessTokenRotation))