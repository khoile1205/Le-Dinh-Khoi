import { NextFunction, Request, Response } from "express";
import { CreateGenreDTO, UpdateGenreDTO } from "../dtos/request/genres";
import { GenreFilterDTO } from "../dtos/request/genres/GenreFilterDTO";
import { GenreService } from "../services/genre.service";
import { HttpStatus } from "../constants/http.status";
import { sendResponse } from "../core/helper/responseHelper";
import { IGenreService } from "../interface/genre.service";

/**
 * @swagger
 * /api/v1/genres:
 *   get:
 *     summary: Retrieve a list of genres
 *     tags: [Genres]
 *     parameters:
 *       - in: query
 *         name: name
 *         description: Filter genres by name
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 */
export class GenreController {
  private genreService: IGenreService;

  constructor(genreService: IGenreService) {
    this.genreService = genreService;
  }

  /**
   * @swagger
   * /api/v1/genres:
   *   post:
   *     summary: Create a new genre
   *     tags: [Genres]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateGenreDTO'
   *     responses:
   *       201:
   *         description: Genre created successfully
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    const newGenre: CreateGenreDTO = req.body;
    try {
      const genre = await this.genreService.create(newGenre);
      sendResponse(
        res,
        HttpStatus.CREATED,
        genre,
        "Genre created successfully"
      );
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/genres/{id}:
   *   patch:
   *     summary: Update an existing genre
   *     tags: [Genres]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: The ID of the genre to update
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateGenreDTO'
   *     responses:
   *       200:
   *         description: Genre updated successfully
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updateGenre: UpdateGenreDTO = req.body;
    try {
      const genre = await this.genreService.update(Number(id), updateGenre);
      sendResponse(res, HttpStatus.OK, genre, "Genre updated successfully");
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/genres/{id}:
   *   delete:
   *     summary: Delete a genre by ID
   *     tags: [Genres]
   *     parameters:
   *       - in: path
   *         name: id
   *         description: The ID of the genre to delete
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Genre deleted successfully
   */
  delete = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      await this.genreService.delete(Number(id));
      sendResponse(res, HttpStatus.OK, null, "Genre deleted successfully");
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/genres:
   *   get:
   *     summary: Retrieve a list of genres
   *     tags: [Genres]
   *     parameters:
   *       - in: query
   *         name: name
   *         description: Filter genres by name
   *         required: false
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: A list of genres
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Genre'
   */
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const filters: GenreFilterDTO = req.query;
    try {
      const genres = await this.genreService.getAll(filters);
      sendResponse(res, HttpStatus.OK, genres, "Genres retrieved successfully");
    } catch (error) {
      next(error);
    }
  };
}
