# Book Catalogue Monorepo

This project is a full-stack Book Catalogue application, organized as a monorepo with separate `client` and `server` folders.

## Project Structure
```
assignment/
  client/   # Next.js + React frontend (Apollo Client, Tailwind CSS)
  server/   # Node.js backend (Apollo Server, Sequelize, PostgreSQL)
```

## Features
- Browse, add, and manage books and authors
- Modern UI with carousels and tables
- GraphQL API with PostgreSQL database
- Clean MVC backend and modular frontend

## Getting Started

### 1. Clone the Repository
```bash
git clone <repo-url>
cd assignment
```

### 2. Setup the Backend (server)
```bash
cd server
npm install
npm start
```
- Make sure PostgreSQL is running locally (see `server/README.md` for details).
- The backend will run at [http://localhost:4000](http://localhost:4000)

### 3. Setup the Frontend (client)
```bash
cd ../client
npm install
npm run dev
```
- The frontend will run at [http://localhost:3000](http://localhost:3000)

## Development Tips
- Each part (`client` and `server`) manages its own dependencies and has its own README.
- Use the GraphQL Playground at `/server` for API testing.
- Use the frontend UI for a modern catalogue experience.

---

**Happy coding!** 