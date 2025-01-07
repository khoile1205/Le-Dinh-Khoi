import { FindOptionsWhere, ILike, Repository } from "typeorm";
import { CreateGenreDTO, UpdateGenreDTO } from "../dtos/request/genres";
import { GenreFilterDTO } from "../dtos/request/genres/GenreFilterDTO";
import { Genre } from "../entities";
import { BadRequestException } from "../exceptions";
import { IGenreService } from "../interface/genre.service";

export class GenreService implements IGenreService {
  private genreRepository: Repository<Genre>;

  constructor(genreRepository: Repository<Genre>) {
    this.genreRepository = genreRepository;
  }

  async getAll(filter: GenreFilterDTO): Promise<Genre[]> {
    const whereCondition: FindOptionsWhere<Genre> = {};

    if (filter.name) {
      whereCondition.name = ILike(`%${filter.name}%`);
    }

    return await this.genreRepository.find({
      where: whereCondition,
      relations: ["books"],
    });
  }

  async create(newGenre: CreateGenreDTO): Promise<Genre> {
    const genre = await this.genreRepository.findOneBy({ name: newGenre.name });
    if (genre) {
      throw new BadRequestException("Genre existed");
    }

    const newData = this.genreRepository.create(newGenre);
    await this.genreRepository.save(newData);

    return newData;
  }

  async update(id: number, updateGenre: UpdateGenreDTO): Promise<Genre> {
    const existedGenre = await this.genreRepository.findOneBy({ id });

    if (!existedGenre) {
      throw new BadRequestException("Genre not found");
    }

    const updatedGenre = this.genreRepository.merge(existedGenre, updateGenre);

    await this.genreRepository.save(updatedGenre);

    return updatedGenre;
  }

  async delete(id: number): Promise<boolean> {
    const existedGenre = await this.genreRepository.findOneBy({ id });

    if (!existedGenre) {
      throw new BadRequestException("Genre not found");
    }

    await this.genreRepository.softRemove(existedGenre);

    return true;
  }
}
