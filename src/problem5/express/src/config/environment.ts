import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 3000,
  POSTGRES_HOST: process.env.POSTGRES_HOST || "localhost",
  POSTGRES_PORT: process.env.POSTGRES_PORT || "5432",
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME || "postgres",
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || "password",
  POSTGRES_DB: process.env.POSTGRES_DB || "postgres",
};
