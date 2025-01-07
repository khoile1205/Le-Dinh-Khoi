import { CreateBookDTO, UpdateBookDTO } from "@/src/dtos/request/books";
import { Books } from "../entities";
import { BooksFilterDTO } from "../dtos/request/books/BooksFilterDTO";

export interface IBooksService {
  getAll(filters: BooksFilterDTO): Promise<Books[]>;
  getById(id: number): Promise<Books | null>;
  create(book: CreateBookDTO): Promise<Books>;
  update(id: number, book: UpdateBookDTO): Promise<Books>;
  delete(id: number): Promise<boolean>;
}
