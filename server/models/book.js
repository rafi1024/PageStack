const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/db');

const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
  picture: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true },
  published_date: { type: DataTypes.DATE, allowNull: true },
});

module.exports = Book; 