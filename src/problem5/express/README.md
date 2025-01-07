# TypeScript Project For Book Management

This project is a TypeScript-based application for managing a collection of books. It includes features for adding, updating, deleting, and viewing books. The project is designed to demonstrate the use of TypeScript with Node.js, Express, and a PostgreSQL database.

# Project Description

This project is a TypeScript-based application for managing a collection of books. It includes features for adding, updating, deleting, and viewing books. The project is designed to demonstrate the use of TypeScript with Node.js, Express, and a PostgreSQL database.

### What the Application Does

The Book Management application allows users to:

- Add new books to the collection
- Update details of existing books
- Delete existed books
- View a list of all books
- Search for books with some specific conditions

### Technologies Used

- **TypeScript**: Provides static typing and modern JavaScript features, improving code quality and maintainability.
- **Node.js**: A JavaScript runtime that allows for server-side scripting and building scalable network applications.
- **Express**: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **PostgreSQL**: A powerful, open-source object-relational database system that uses and extends the SQL language.

# Prerequisites

- Node.js and npm installed
- TypeScript installed (`npm install -g typescript` if not already installed)
- A TypeScript project setup
- PostgreSQL (install Docker Hub, Docker Desktop if you want to run in Docker)

# Run the application

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/book-management.git
   cd book-management
   ```

2. **Install Dependencies:**

   To start, you need to install the required packages:

   ```bash
   $ npm install
   ```

3. **Running the app:**

   If you are using Docker, you can start a PostgreSQL container with the following command:

   ```bash
   $ docker-compose up -d
   ```

   Alternatively, you can install PostgreSQL locally and create a database.

4. **Configure environment variables:**

   To configure the environment variables, you need to copy the example environment of project:

   ```bash
   $ cp .env.example .env
   ```

   After that, add your configuration

5. **Start the server:**

   Run the local application:

   ```bash
   $ npm run start
   ```
6. **(Optional) Seed the database:**

    To seed the data, you can seed the data with the following command:

    ```bash
    $ npm run seed
    ```