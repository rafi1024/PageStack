const { ApolloServer, gql } = require('apollo-server');
const { Sequelize, DataTypes } = require('sequelize');

// Connect to PostgreSQL
const sequelize = new Sequelize('postgres', 'postgres', 'yourpassword', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define Author model
const Author = sequelize.define('Author', {
  name: { type: DataTypes.STRING, allowNull: false },
  picture: { type: DataTypes.STRING, allowNull: false },
});

// Define Book model
const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
  picture: { type: DataTypes.STRING, allowNull: false },
});

// Book belongs to Author
Book.belongsTo(Author);
Author.hasMany(Book);

// GraphQL schema
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

// Resolvers
const resolvers = {
  Query: {
    books: async () => await Book.findAll({ include: Author }),
    authors: async () => await Author.findAll({ include: Book }),
  },
  Mutation: {
    createBook: async (_, { title, authorId, picture }) => {
      const book = await Book.create({ title, AuthorId: authorId, picture });
      return await Book.findByPk(book.id, { include: Author });
    },
    createAuthor: async (_, { name, picture }) => {
      return await Author.create({ name, picture });
    },
  },
  Book: {
    author: async (book) => await Author.findByPk(book.AuthorId),
  },
  Author: {
    books: async (author) => await Book.findAll({ where: { authorId: author.id } }),
  },
};

// Sync models and start Apollo Server
sequelize.sync().then(() => {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen(4000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}); 