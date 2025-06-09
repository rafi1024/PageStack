const { Book, Author } = require('../models');

const getAllBooks = async () => {
  return await Book.findAll({ include: Author });
};

const createBook = async ({ title, authorId, picture, description, published_date }) => {
  const book = await Book.create({ 
    title, 
    AuthorId: authorId, 
    picture,
    description,
    published_date 
  });
  return await Book.findByPk(book.id, { include: Author });
};

module.exports = { getAllBooks, createBook }; 