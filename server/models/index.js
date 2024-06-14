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


const User = require('./user')(sequelize, Sequelize.DataTypes);
const Item = require('./item')(sequelize, Sequelize.DataTypes);
const Symptom = require('./symptom')(sequelize, Sequelize.DataTypes);

User.hasMany(Item, { foreignKey: 'userId' });
User.hasMany(Symptom, { foreignKey: 'userId' });
Item.hasMany(Symptom, { foreignKey: 'itemId' });

Item.belongsTo(User, { foreignKey: 'userId' });
Symptom.belongsTo(User, { foreignKey: 'userId' });
Symptom.belongsTo(Item, { foreignKey: 'itemId' });

const db = {
  sequelize,
  User,
  Item,
  Symptom,
};

module.exports = db;
