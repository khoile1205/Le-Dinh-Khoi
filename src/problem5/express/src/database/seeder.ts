import { faker } from "@faker-js/faker";
import { Genre, Books } from "../entities";
import { AppDatasource } from "./config";

export const seedData = async () => {
  await AppDatasource.initialize();

  // Create a few genres
  const genres: Genre[] = [];
  for (let i = 0; i < 5; i++) {
    const genre = new Genre();
    genre.name = faker.commerce.department();
    genres.push(genre);
  }
  // Save genres to database
  const savedGenres = await AppDatasource.manager.save(Genre, genres);
  console.log(`${savedGenres.length} genres seeded.`);

  // Create books with random data
  const books: Books[] = [];

  for (let i = 0; i < 20; i++) {
    const book = new Books();
    book.title = faker.lorem.words(3);
    book.author = faker.person.fullName();
    book.description = faker.lorem.paragraph();
    book.publishedYear = faker.date.past({ years: 20 }).getFullYear(); // Random year in the past 20 years
    book.genreId = faker.number.int({ min: 1, max: genres.length }); // Assign random genre
    book.publisher = faker.company.name();
    book.language = faker.helpers.arrayElement([
      "English",
      "Spanish",
      "German",
      "French",
      "Chinese",
    ]);

    books.push(book);
  }

  // Save books to database
  const savedBooks = await AppDatasource.manager.save(Books, books);
  console.log(`${savedBooks.length} books seeded.`);

  // Close connection
  await AppDatasource.destroy();
  console.log("Seeding completed!");
};

seedData().catch((err) => {
  console.error("Error seeding data:", err);
  process.exit(1);
});