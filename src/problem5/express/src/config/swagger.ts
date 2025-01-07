export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books API",
      version: "1.0.0",
      description: "This is a simple CRUD API for managing books",
    },
    components: {
      schemas: {
        Book: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            title: {
              type: "string",
            },
            author: {
              type: "string",
            },
            publishedDate: {
              type: "string",
              format: "date",
            },
          },
        },

        CreateBookDTO: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Title of the book",
              example: "The Great Gatsby",
            },
            author: {
              type: "string",
              description: "Author of the book",
              example: "F. Scott Fitzgerald",
            },
            description: {
              type: "string",
              description: "Description of the book",
              example: "A classic novel set in the 1920s",
            },
            publishedYear: {
              type: "integer",
              description: `Year the book was published (1000-${new Date().getUTCFullYear()})`,
              minimum: 1000,
              maximum: new Date().getUTCFullYear(),
              example: 1925,
            },
            genre: {
              type: "number",
              description: "Genre of the book",
              example: 1,
            },
            publisher: {
              type: "string",
              description: "Publisher of the book",
              example: "Scribner",
            },
            language: {
              type: "string",
              description: "Language of the book",
              example: "English",
            },
          },
          required: [
            "title",
            "author",
            "description",
            "publishedYear",
            "genre",
            "publisher",
            "language",
          ],
        },
        UpdateBookDTO: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "Title of the book",
              example: "The Great Gatsby",
            },
            author: {
              type: "string",
              description: "Author of the book",
              example: "F. Scott Fitzgerald",
            },
            description: {
              type: "string",
              description: "Description of the book",
              example: "A classic novel set in the 1920s",
            },
            publishedYear: {
              type: "integer",
              description: `Year the book was published (1000-${new Date().getUTCFullYear()})`,
              minimum: 1000,
              maximum: new Date().getUTCFullYear(),
              example: 1925,
            },
            genre: {
              type: "number",
              description: "Genre of the book",
              example: 1,
            },
            publisher: {
              type: "string",
              description: "Publisher of the book",
              example: "Scribner",
            },
            language: {
              type: "string",
              description: "Language of the book",
              example: "English",
            },
          },
        },
        Genre: {
          type: "object",
          properties: {
            id: {
              type: "integer",
            },
            name: {
              type: "string",
            },
          },
        },
        CreateGenreDTO: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
          },
          required: ["name"],
        },
        UpdateGenreDTO: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
          },
        },
        GenreFilterDTO: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the genre to filter",
            },
          },
        },
      },
    },
  },
  apis: ["./src/controllers/**/*.ts", "./src/dtos/**/*.ts"],
};
