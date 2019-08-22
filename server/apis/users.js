// apis/users.js
const router = require('express').Router();
const db = require('../../db/db')
const Users = require('../../db/Users');

// matches GET requests to /api/users/
router.get('/', function(req, res, next) {
  /* etc */
});

// matches POST requests to /api/users/
// use /auth/signup instead!
// router.post('/', function(req, res, next) {
//   try {
//       Users.create(req.body);
//       res.status(200);
//   } catch (err) {
//     console.error(err);
//   }
// });

// matches PUT requests to /api/users/:userId
router.put('/:userId', function(req, res, next) {
  /* etc */
});

// matches DELETE requests to /api/users/:userId
router.delete('/:userId', function(req, res, next) {
  /* etc */
});

module.exports = router;
