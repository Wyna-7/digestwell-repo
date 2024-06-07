const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('digestwell', 'brice', 'null', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
