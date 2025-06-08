const { DataTypes } = require('sequelize');
const sequelize = require('../helpers/db');

const Author = sequelize.define('Author', {
  name: { type: DataTypes.STRING, allowNull: false },
  picture: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Author; 