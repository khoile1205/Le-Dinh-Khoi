import { BooksController } from "@/src/controllers/books.controller";
import { DIContainer } from "@/src/di/container";
import { container } from "@/src/di/initialize";
import { CreateBookDTO, UpdateBookDTO } from "@/src/dtos/request/books";
import { validateRequest } from "@/src/middleware/validate.dto.middlware";
import { Router } from "express";

// const booksRouter = Router();

export const booksRouter = () => {
  const router = Router();
  console.log("booksRouter is running");

  // Resolve the BooksController from the DI container
  const booksController = new BooksController(
    container.resolve(BooksController.name)
  );

  // // Define routes for the books resource
  router.get("/:id", () => {
    console.log("booksRouter get id is running");
  });
  // router.get("/", booksController.getAll);
  // router.post("/", validateRequest(CreateBookDTO), booksController.create);
  // router.patch("/:id", validateRequest(UpdateBookDTO), booksController.update);
  // router.delete("/:id", booksController.remove);

  return router;
};

// Resolve the BooksController from the DI container
// const booksController = container.resolve<BooksController>(
//   BooksController.name
// );

// Define routes for the books resource
// booksRouter.get("/:id", booksController.getById);
// booksRouter.get("/", booksController.getAll);
// booksRouter.post("/", validateRequest(CreateBookDTO), booksController.create);
// booksRouter.patch(
//   "/:id",
//   validateRequest(UpdateBookDTO),
//   booksController.update
// );
// booksRouter.delete("/:id", booksController.remove);
