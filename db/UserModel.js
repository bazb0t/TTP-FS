// starter User Model for boilerplating

const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
            notNull: true,
            unique: true,
        }
    }
});

module.exports = User;
