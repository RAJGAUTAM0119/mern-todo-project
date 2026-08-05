import express from "express";
import { authRouter } from "./features/auth/auth.route.ts";
import { errorMiddelware } from "./shared/middleware/error.middleware.ts";
import cookieParser from "cookie-parser";
import { todoRouter } from "./features/todo/todo.routes.ts";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todo", todoRouter);

app.use(errorMiddelware)

export default app;
