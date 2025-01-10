import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../constants/http.status";
import { sendResponse } from "../core/helper/responseHelper";
import { CreateBookDTO, UpdateBookDTO } from "../dtos/request/books";
import { IBooksService } from "../interface/books.service";
import { BooksFilterDTO } from "../dtos/request/books/BooksFilterDTO";

// /**
//  * @swagger
//  * tags:
//  *   name: Books
//  *   description: API for managing books
//  */
export class BooksController {
  private bookService: IBooksService;

  constructor(bookService: IBooksService) {
    this.bookService = bookService;
  }

  /**
   * @swagger
   * /api/v1/books:
   *   get:
   *     summary: Retrieve a list of books
   *     tags: [Books]
   *     parameters:
   *       - in: query
   *         name: author
   *         required: false
   *         schema:
   *           type: string
   *         description: Author of the book
   *       - in: query
   *         name: genreId
   *         required: false
   *         schema:
   *           type: integer
   *         description: Genre ID of the book
   *       - in: query
   *         name: title
   *         required: false
   *         schema:
   *           type: string
   *         description: Title of the book
   *       - in: query
   *         name: language
   *         required: false
   *         schema:
   *           type: string
   *         description: Language of the book
   *       - in: query
   *         name: publisherStartYear
   *         required: false
   *         schema:
   *            type: integer
   *         description: Start year of the publisher
   *       - in: query
   *         name: publisherEndYear
   *         required: false
   *         schema:
   *          type: integer
   *         description: End year of the publisher
   *     responses:
   *       200:
   *         description: A list of books
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Book'
   *       400:
   *         description: Invalid year range or bad request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Invalid publisher year range: start year cannot be greater than end year."
   */
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const filters: BooksFilterDTO = req.query;
    try {
      const books = await this.bookService.getAll(filters);
      sendResponse(res, HttpStatus.OK, books, "Books retrieved successfully");
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/books/{id}:
   *   get:
   *     summary: Get a book by ID
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The book ID
   *     responses:
   *       200:
   *         description: Book details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       404:
   *         description: Book not found
   */
  getById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const book = await this.bookService.getById(+id);
      if (!book) {
        sendResponse(res, HttpStatus.NOT_FOUND, null, "Book not found");
      }
      sendResponse(res, HttpStatus.OK, book);
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/books:
   *   post:
   *     summary: Create a new book
   *     tags: [Books]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBookDTO'
   *     responses:
   *       201:
   *         description: Book created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   */
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createBookDTO: CreateBookDTO = req.body;
      const book = await this.bookService.create(createBookDTO);
      sendResponse(res, HttpStatus.CREATED, book, "Book created successfully");
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/books/{id}:
   *   patch:
   *     summary: Update an existing book
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The book ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateBookDTO'
   *     responses:
   *       200:
   *         description: Book updated successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   */
  update = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const updateBookDTO: UpdateBookDTO = req.body;
      const book = await this.bookService.update(+id, updateBookDTO);
      sendResponse(res, HttpStatus.OK, book, "Book updated successfully");
    } catch (error) {
      next(error);
    }
  };

  /**
   * @swagger
   * /api/v1/books/{id}:
   *   delete:
   *     summary: Remove a book by ID
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The book ID
   *     responses:
   *       204:
   *         description: Book deleted successfully
   */
  remove = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      await this.bookService.delete(+id);
      sendResponse(res, HttpStatus.OK, null, "Book deleted successfully");
    } catch (error) {
      next(error);
    }
  };
}
