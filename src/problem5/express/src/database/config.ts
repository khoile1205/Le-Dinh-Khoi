import { DataSource } from "typeorm";
import { ENV } from "../config/environment";

export const AppDatasource = new DataSource({
  type: "postgres",
  host: ENV.POSTGRES_HOST,
  port: parseInt(ENV.POSTGRES_PORT),
  username: ENV.POSTGRES_USERNAME,
  password: ENV.POSTGRES_PASSWORD,
  database: ENV.POSTGRES_DB,
  synchronize: true,
  // logging: false,
  // dropSchema: true,
  entities: ["src/entities/**/*.ts"],
});
