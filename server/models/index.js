const sequelize = require('../helpers/db');
const Author = require('./author');
const Book = require('./book');

Book.belongsTo(Author);
Author.hasMany(Book);

module.exports = { sequelize, Author, Book }; 