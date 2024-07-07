const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
});

const User = require('./User');

const db = {
  User,
  sequelize,
  Sequelize,
};

module.exports = db;
