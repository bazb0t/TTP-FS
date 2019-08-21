// apis/users.js
// const Sequelize = require('sequelize');
const router = require('express').Router();
const db = require('../../db/db')
const User = require('../../db/User');

// matches GET requests to /api/users/
router.get('/', function(req, res, next) {
  /* etc */
});

// matches POST requests to /api/users/
router.post('/', function(req, res, next) {
  try {
      User.create(req.body);
      res.status(200);
  } catch (error) {
    console.error(error);
  }
});

// matches PUT requests to /api/users/:userId
router.put('/:userId', function(req, res, next) {
  /* etc */
});

// matches DELETE requests to /api/users/:userId
router.delete('/:userId', function(req, res, next) {
  /* etc */
});

module.exports = router;
