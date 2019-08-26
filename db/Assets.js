const Sequelize = require('sequelize')
const db = require('./db')

const Assets = db.define('Assets', {
    tickerSymbol: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    qty: {
        type: Sequelize.INTEGER,
    }
})

module.exports = Assets;
