import bodyParser from "body-parser";
import express, { Application, Router } from "express";
import "reflect-metadata";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./src/config/swagger";
import { BooksController } from "./src/controllers/books.controller";
import { validateRequest } from "./src/middleware/validate.dto.middlware";
import { AppDatasource } from "./src/database/config";
import { DIContainer } from "./src/di/container";
import { CreateBookDTO, UpdateBookDTO } from "./src/dtos/request/books";
import { globalErrorHandlerMiddlware } from "./src/middleware/global.middleware";
import { container, initializeDIContainer } from "./src/di/initialize";
import { GenreController } from "./src/controllers/genres.controller";
import { BooksFilterDTO } from "./src/dtos/request/books/BooksFilterDTO";
import { CreateGenreDTO, UpdateGenreDTO } from "./src/dtos/request/genres";
import { GenreFilterDTO } from "./src/dtos/request/genres/GenreFilterDTO";

class App {
  private express: Application;
  private port: number;

  constructor({ port }: { port: number }) {
    this.port = port;
    this.express = express();
    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  private async initializeDatabase() {
    await AppDatasource.initialize();
  }

  private async initializeMiddlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
  }

  private initializeSwagger() {
    // Initialize Swagger JSDoc
    const swaggerSpec = swaggerJSDoc(swaggerOptions);

    // Serve Swagger UI
    this.express.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(
      `Swagger docs is running on port http://[::1]:${this.port}/docs`
    );
  }
  private initializeErrorHandling() {
    this.express.use(globalErrorHandlerMiddlware);
  }

  private async initializeRoutes() {
    const booksController = container.resolve<BooksController>(
      BooksController.name
    );

    this.express.get("/api/v1/books/:id", booksController.getById);
    this.express.get(
      "/api/v1/books",
      validateRequest(BooksFilterDTO),
      booksController.getAll
    );
    this.express.post(
      "/api/v1/books",
      validateRequest(CreateBookDTO),
      booksController.create
    );
    this.express.patch(
      "/api/v1/books/:id",
      validateRequest(UpdateBookDTO),
      booksController.update
    );
    this.express.delete("/api/v1/books/:id", booksController.remove);

    const genresController = container.resolve<GenreController>(
      GenreController.name
    );
    this.express.get(
      "/api/v1/genres",
      validateRequest(GenreFilterDTO),
      genresController.getAll
    );
    this.express.post(
      "/api/v1/genres",
      validateRequest(CreateGenreDTO),
      genresController.create
    );
    this.express.patch(
      "/api/v1/genres/:id",
      validateRequest(UpdateGenreDTO),
      genresController.update
    );
    this.express.delete("/api/v1/genres/:id", genresController.delete);
  }

  public async start() {
    this.express.listen(this.port, () => {
      console.log(`Server is running on port http://[::1]:${this.port}`);
    });
  }
}

export default App;
