const { getAllBooks, createBook } = require('../controllers/bookController');
const { getAllAuthors, createAuthor } = require('../controllers/authorController');
const { Author, Book } = require('../models');

const resolvers = {
  Query: {
    books: getAllBooks,
    authors: getAllAuthors,
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