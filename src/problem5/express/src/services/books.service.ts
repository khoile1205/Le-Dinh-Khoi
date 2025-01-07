import {
  Between,
  FindOptionsWhere,
  ILike,
  LessThan,
  Repository,
} from "typeorm";
import { Books } from "../entities/books.entity";
import { CreateBookDTO, UpdateBookDTO } from "../dtos/request/books";
import { IBooksService } from "../interface/books.service";
import { Genre } from "../entities";
import { BadRequestException } from "../exceptions";
import { BooksFilterDTO } from "../dtos/request/books/BooksFilterDTO";

export class BooksService implements IBooksService {
  private bookRepository: Repository<Books>;
  private genreRepository: Repository<Genre>;

  constructor(
    bookRepository: Repository<Books>,
    genreRepository: Repository<Genre>
  ) {
    this.bookRepository = bookRepository;
    this.genreRepository = genreRepository;
  }

  async getAll(filters: BooksFilterDTO): Promise<Books[]> {
    const findCondition: FindOptionsWhere<Books> = {};
    if (filters.author) {
      findCondition.author = ILike(`%${filters.author}%`);
    }

    if (filters.title) {
      findCondition.title = ILike(`%${filters.title}%`);
    }

    if (filters.genreId) {
      findCondition.genreId = filters.genreId;
    }

    if (filters.language) {
      findCondition.language = `${filters.language}`;
    }

    const [startYear, endYear] = [
      filters.publisherStartYear,
      filters.publisherEndYear,
    ];

    if (startYear && endYear && startYear > endYear) {
      throw new BadRequestException(
        "Invalid publisher year range: start year cannot be greater than end year."
      );
    }

    if (startYear && endYear) {
      findCondition.publishedYear = Between(startYear, endYear);
    } else if (startYear) {
      findCondition.publishedYear = Between(
        startYear,
        new Date().getFullYear()
      );
    } else if (endYear) {
      findCondition.publishedYear = LessThan(endYear);
    }

    return await this.bookRepository.find({ where: findCondition });
  }

  async getById(id: number): Promise<Books | null> {
    const existedBooks = await this.bookRepository.findOneBy({ id });

    if (!existedBooks) {
      throw new BadRequestException("Books not found");
    }

    return existedBooks;
  }

  async create(book: CreateBookDTO): Promise<Books> {
    const genre = await this.genreRepository.findOneBy({ id: book.genre });
    if (!genre) {
      throw new BadRequestException("Genre not found");
    }

    const newBook = this.bookRepository.create({ ...book, genre });
    await this.bookRepository.save(newBook);

    return newBook;
  }

  async update(id: number, book: UpdateBookDTO): Promise<Books> {
    const existedBooks = await this.bookRepository.findOneBy({ id });

    if (!existedBooks) {
      throw new BadRequestException("Books not found");
    }

    const genre = await this.genreRepository.findOneBy({ id: book.genre });
    if (!genre) {
      throw new BadRequestException("Genre not found");
    }

    const updatedBooks = this.bookRepository.merge(existedBooks, {
      ...book,
      genre,
    });

    await this.bookRepository.save(updatedBooks);

    return updatedBooks;
  }

  async delete(id: number): Promise<boolean> {
    const existedBooks = await this.bookRepository.findOneBy({ id });

    if (!existedBooks) {
      throw new BadRequestException("Books not found");
    }

    await this.bookRepository.softRemove(existedBooks);

    return true;
  }
}
