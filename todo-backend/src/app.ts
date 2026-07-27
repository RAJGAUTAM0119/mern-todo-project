import express from "express";
import { authRouter } from "./features/auth/auth.route.ts";
import { errorMiddelware } from "./shared/middleware/error.middleware.ts";

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/v1/auth", authRouter);
app.use(errorMiddelware)

export default app;
