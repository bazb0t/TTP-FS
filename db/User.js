//  User Model
const crypto = require('crypto');
const _ = require('lodash');
const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define(
  'User',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: true
      },
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    salt: {
      type: Sequelize.STRING
    }
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword
    }
  }
);

// instance methods
User.prototype.correctPassword = function(candidatePassword) {
  return (
    this.Model.encryptPassword(candidatePassword, this.salt) === this.password
  );
};

User.prototype.sanitize = function() {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

function setSaltAndPassword(user) {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
}
module.exports = User;
