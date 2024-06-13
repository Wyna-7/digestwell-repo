require('dotenv').config();
const { Sequelize } = require('sequelize');

const DB_URL = process.env.DB_URL ? process.env.DB_URL : 'localhost';
const DB_USER = process.env.DB_USER ? process.env.DB_USER: 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD ? process.env.DB_PASSWORD: null;
const DB_NAME = process.env.DB_NAME ? process.env.DB_NAME: 'digestwell';


const sequelize = new Sequelize(
  DB_NAME, 
  DB_USER, 
  DB_PASSWORD, 
  {
    host: DB_URL,
    dialect: 'postgres',
    logging: false,
  });

module.exports = sequelize;
