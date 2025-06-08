const { gql } = require('apollo-server');

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    picture: String!
    books: [Book!]
  }

  type Book {
    id: ID!
    title: String!
    picture: String!
    author: Author!
  }

  type Query {
    books: [Book!]!
    authors: [Author!]!
  }

  type Mutation {
    createBook(title: String!, authorId: ID!, picture: String!): Book!
    createAuthor(name: String!, picture: String!): Author!
  }
`;

module.exports = typeDefs; 