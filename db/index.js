const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./UserModel');
const Transaction = require('./TransactionModel');

// Associations
User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = db;
