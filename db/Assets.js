const Sequelize = require('sequelize');
const db = require('./db');

const Assets = db.define('Assets', {
  tickerSymbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  qty: {
    type: Sequelize.INTEGER
  },
  totalValue: {
    type: Sequelize.DECIMAL(1000, 2)
  }
});

module.exports = Assets;
