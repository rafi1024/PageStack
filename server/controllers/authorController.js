const { Author, Book } = require('../models');

const getAllAuthors = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  
  const { count, rows: authors } = await Author.findAndCountAll({
    include: Book,
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  });

  return {
    authors,
    total: count,
    hasMore: offset + authors.length < count
  };
};

const getAuthorById = async (id) => {
  return await Author.findByPk(id, { include: Book });
};

const createAuthor = async ({ name, picture, biography, born_date }) => {
  return await Author.create({ 
    name, 
    picture,
    biography,
    born_date 
  });
};

module.exports = { getAllAuthors, getAuthorById, createAuthor }; 