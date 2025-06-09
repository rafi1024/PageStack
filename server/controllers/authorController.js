const { Author, Book } = require('../models');

const getAllAuthors = async () => {
  return await Author.findAll({ include: Book });
};

const createAuthor = async ({ name, picture, biography, born_date }) => {
  return await Author.create({ 
    name, 
    picture,
    biography,
    born_date 
  });
};

module.exports = { getAllAuthors, createAuthor }; 