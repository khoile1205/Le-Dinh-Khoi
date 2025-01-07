import { Router } from "express";
import { booksRouter } from "./books.routes";

export const apiRouter = () => {
  const router = Router();
  console.log("router is running");
  router.use("/books", booksRouter());
  router.use("/test", booksRouter());


  return router;
};
