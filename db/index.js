// const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./Users');
const Transactions = require('./Transactions');
const Assets = require('./Assets');

// Associations
User.hasMany(Transactions);
Transactions.belongsTo(User);

User.hasMany(Assets); // will add an attribute UserId to the Assets model! Portfolio = Assets.findAll(where: {userId = grab user id})

module.exports = db;
