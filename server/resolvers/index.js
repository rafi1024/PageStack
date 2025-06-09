const { getAllBooks, getBookById, createBook } = require('../controllers/bookController');
const { getAllAuthors, getAuthorById, createAuthor } = require('../controllers/authorController');
const { Author, Book } = require('../models');

const resolvers = {
  Query: {
    books: (_, { page = 1, limit = 10, authorId }) => getAllBooks(page, limit, authorId),
    authors: (_, { page = 1, limit = 10 }) => getAllAuthors(page, limit),
    book: (_, { id }) => getBookById(id),
    author: (_, { id }) => getAuthorById(id),
  },
  Mutation: {
    createBook: (_, args) => createBook(args),
    createAuthor: (_, args) => createAuthor(args),
  },
  Book: {
    author: async (book) => await Author.findByPk(book.AuthorId),
  },
  Author: {
    books: async (author) => await Book.findAll({ where: { AuthorId: author.id } }),
  },
};

module.exports = resolvers; 