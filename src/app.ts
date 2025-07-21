import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { errorHandler } from "./middleware/error-handler";
import { authMiddleware } from "./middleware/auth-middleware";
import { authRouter } from "@routes/auth.route";
import { userRouter } from "@routes/user.route";

dotenv.config();

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api/auth", authRouter);
  app.use("/api/users", authMiddleware, userRouter);
  app.use(errorHandler);

  return app;
};
