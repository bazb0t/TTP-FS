// const Sequelize = require('sequelize');
const db = require('./db');
const Users = require('./Users');
const Transactions = require('./Transactions');

// Associations
Users.hasMany(Transactions);
Transactions.belongsTo(Users);

module.exports = db;
