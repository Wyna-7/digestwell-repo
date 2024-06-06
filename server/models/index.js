const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('digestwell', 'brice', 'null', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
