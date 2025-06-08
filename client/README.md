# Book Catalogue Client

This is the frontend application for the Book Catalogue project. It is built with Next.js, React, Apollo Client, and Tailwind CSS.

## Features
- Modern UI for browsing and managing books and authors
- Apollo Client for GraphQL queries and mutations
- Responsive design with Tailwind CSS
- Carousel and table views for books and authors

## Tech Stack
- Next.js (React)
- Apollo Client (GraphQL)
- Tailwind CSS

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure GraphQL Endpoint:**
   - By default, the client expects the backend GraphQL API at `http://localhost:4000/`.
   - If your backend runs elsewhere, update the Apollo Client URI in `app/ApolloProvider.js`.

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will run at [http://localhost:3000](http://localhost:3000)

## Folder Structure
```
client/
  app/             # Next.js app directory (pages, components)
  public/          # Static assets
  tailwind.config.js
  postcss.config.js
  package.json     # Client dependencies
  ...
```

## Usage
- Browse books and authors, add new entries, and view details.
- Use the carousels and tables for a modern catalogue experience.
- Connects to the backend GraphQL API for all data operations.

---

**Happy coding!**
