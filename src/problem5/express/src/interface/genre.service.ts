import { CreateBookDTO, UpdateBookDTO } from "@/src/dtos/request/books";
import { Genre } from "../entities";
import { GenreFilterDTO } from "../dtos/request/genres/GenreFilterDTO";
import { CreateGenreDTO, UpdateGenreDTO } from "../dtos/request/genres";

export interface IGenreService {
  getAll(filters: GenreFilterDTO): Promise<Genre[]>;
  create(genre: CreateGenreDTO): Promise<Genre>;
  update(id: number, book: UpdateGenreDTO): Promise<Genre>;
  delete(id: number): Promise<boolean>;
}
