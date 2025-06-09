const { Book, Author } = require('../models');

const getAllBooks = async (page = 1, limit = 10, authorId = null) => {
  const offset = (page - 1) * limit;
  
  const whereClause = authorId ? { AuthorId: authorId } : {};
  
  const { count, rows: books } = await Book.findAndCountAll({
    where: whereClause,
    include: Author,
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  });

  return {
    books,
    total: count,
    hasMore: offset + books.length < count
  };
};

const getBookById = async (id) => {
  return await Book.findByPk(id, { include: Author });
};

const createBook = async ({ title, picture, description, published_date, authorId }) => {
  return await Book.create({ 
    title, 
    picture,
    description,
    published_date,
    AuthorId: authorId 
  });
};

module.exports = { getAllBooks, getBookById, createBook }; 