const { gql } = require('apollo-server');

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    picture: String!
    biography: String
    born_date: String
    books: [Book!]
  }

  type Book {
    id: ID!
    title: String!
    picture: String!
    description: String
    published_date: String
    author: Author!
  }

  type Query {
    books: [Book!]!
    authors: [Author!]!
  }

  type Mutation {
    createBook(title: String!, authorId: ID!, picture: String!, description: String, published_date: String): Book!
    createAuthor(name: String!, picture: String!, biography: String, born_date: String): Author!
  }
`;

module.exports = typeDefs; 