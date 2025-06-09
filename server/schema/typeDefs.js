const { gql } = require('apollo-server');

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    picture: String!
    biography: String
    born_date: String
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    picture: String!
    description: String
    published_date: String
    author: Author!
  }

  type PaginatedBooks {
    books: [Book!]!
    total: Int!
    hasMore: Boolean!
  }

  type PaginatedAuthors {
    authors: [Author!]!
    total: Int!
    hasMore: Boolean!
  }

  type Query {
    books(page: Int, limit: Int, authorId: ID): PaginatedBooks!
    authors(page: Int, limit: Int): PaginatedAuthors!
    book(id: ID!): Book
    author(id: ID!): Author
  }

  type Mutation {
    createBook(title: String!, picture: String!, description: String, published_date: String, authorId: ID!): Book!
    createAuthor(name: String!, picture: String!, biography: String, born_date: String): Author!
  }
`;

module.exports = typeDefs; 