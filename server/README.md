# Book Catalogue Server

This is the backend GraphQL API for the Book Catalogue application. It uses Node.js, Apollo Server, Sequelize ORM, and PostgreSQL.

## Features
- GraphQL API for managing books and authors
- PostgreSQL database with Sequelize ORM
- MVC folder structure for maintainability

## Tech Stack
- Node.js
- Apollo Server (GraphQL)
- Sequelize ORM
- PostgreSQL

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Database:**
   - Make sure PostgreSQL is running locally.
   - The default connection is to the `postgres` database with user `postgres` and no password. Edit `server/helpers/db.js` if you need to change this.

3. **Start the server:**
   ```bash
   npm start
   ```
   The server will run at [http://localhost:4000](http://localhost:4000)

## Folder Structure
```
server/
  controllers/    # Business logic for books and authors
  helpers/        # Database connection
  models/         # Sequelize models and associations
  resolvers/      # GraphQL resolvers
  schema/         # GraphQL type definitions
  index.js        # Main server entry point
  package.json    # Server dependencies
```

## Usage
- Use the GraphQL Playground at [http://localhost:4000](http://localhost:4000) to test queries and mutations.
- Connect your frontend client to this server for full-stack functionality.

---

**Happy coding!** 