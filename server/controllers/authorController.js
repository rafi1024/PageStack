const { Author, Book } = require('../models');

const getAllAuthors = async () => {
  return await Author.findAll({ include: Book });
};

const createAuthor = async ({ name, picture }) => {
  return await Author.create({ name, picture });
};

module.exports = { getAllAuthors, createAuthor }; 