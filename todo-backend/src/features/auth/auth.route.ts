import { Router } from "express";
import { auth } from "./auth.controller.ts";
import { asyncHandler } from "../../shared/middleware/asyncHandler.ts";
export const authRouter = Router();

authRouter.post("/register", asyncHandler(auth.registerUser));
authRouter.post('/login', asyncHandler(auth.loginUser))
