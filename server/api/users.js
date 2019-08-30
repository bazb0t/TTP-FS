// apis/users.js
const router = require('express').Router();
const Users = require('../../db/Users');

// matches GET requests to /api/users/
router.get('/', async (req, res, next) => {
  try {
    const users = await Users.findAll({
      attributes: ['id', 'email']
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// matches PUT requests to /api/users/
// updates balance after transaction; send it: newBalance
router.put('/:userId', async (req, res, next) => {
  try {
    await Users.update(
      {
        cash: req.body.cash
      },
      {
        where: {
          id: req.params.userId
        }
      }
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
