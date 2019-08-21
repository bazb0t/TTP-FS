//  User Model
const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('User', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notNull: true,
        },
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

module.exports = User;
