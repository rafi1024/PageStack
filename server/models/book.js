const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/db');

const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
  picture: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Book; 