// Transaction Model

const Sequelize = require('sequelize');
const db = require('./db');

const Transactions = db.define('Transactions', {
    tickerSymbol: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    method: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.DECIMAL(2),
        allowNull: false,
    },
    qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {min: 1}
    },
    // gets a userId by association
});

module.exports = Transactions;
