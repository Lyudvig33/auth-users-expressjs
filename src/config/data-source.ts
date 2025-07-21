import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { UsersEntity } from "@entities/user.entity";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [UsersEntity],
});
