const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'yourpassword', {
  host: 'localhost',
  dialect: 'postgres',
});


module.exports = sequelize; 