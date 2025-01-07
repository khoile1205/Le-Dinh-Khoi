import { BooksController } from "../controllers/books.controller";
import { GenreController } from "../controllers/genres.controller";
import { AppDatasource } from "../database/config";
import { Genre } from "../entities";
import { Books } from "../entities/books.entity";
import { BooksService } from "../services/books.service";
import { GenreService } from "../services/genre.service";
import { DIContainer } from "./container";

export const container = new DIContainer();

export function initializeDIContainer() {
  // Register services
  container.register(
    BooksService.name,
    new BooksService(
      AppDatasource.getRepository(Books),
      AppDatasource.getRepository(Genre)
    )
  );
  container.register(
    GenreService.name,
    new GenreService(AppDatasource.getRepository(Genre))
  );

  // Register controllers
  container.register(
    BooksController.name,
    new BooksController(container.resolve<BooksService>(BooksService.name))
  );
  container.register(
    GenreController.name,
    new GenreController(container.resolve<GenreService>(GenreService.name))
  );
}
