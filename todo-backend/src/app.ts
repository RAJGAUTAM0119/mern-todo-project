import express from "express";
import { authRouter } from "./features/auth/auth.route.ts";
import { errorMiddleware } from "./shared/middleware/error.middleware.ts";
import cookieParser from "cookie-parser";
import { todoRouter } from "./features/todo/todo.routes.ts";
import { notFound } from "./features/error case/not_found.ts";

const app = express();
const frontendOrigin = process.env.FRONTEND_URL ?? "http://localhost:3000";
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", frontendOrigin);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todo", todoRouter);

app.use(notFound)

app.use(errorMiddleware)

export default app;