// const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./User');
const Transaction = require('./Transaction');

// Associations
User.hasMany(Transaction);
Transaction.belongsTo(User);

module.exports = db;
