const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/db');

const Author = sequelize.define('Author', {
  name: { type: DataTypes.STRING, allowNull: false },
  picture: { type: DataTypes.STRING, allowNull: false },
  biography: { type: DataTypes.STRING, allowNull: true },
  born_date: { type: DataTypes.DATE, allowNull: true }
});

module.exports = Author; 