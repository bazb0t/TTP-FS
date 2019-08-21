const router = require('express').Router();
const User = require('../../db/User');

router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      console.log(
        'No investors found with those credentials. Please try again, or sign up.'
      );
      res
        .status(401)
        .send(
          'No investors found with those credentials. Please try again, or sign up.'
        );
    } else {
      req.login(user, err => {
        if (err) next(err);
        else res.json(user);
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    if (req.body.password === '') {
      res.status(401).send('Please enter your password.');
    } else {
      const user = await User.create(req.body);
      req.login(user, err => {
        if (err) next(err);
        else res.json(user).redirect('/Portfolio');
      });
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      console.log('Investor already registered! Please sign in.');
      res
        .status(401)
        .send('Investor already registered! Please sign in.')
        .redirect('/SignIN');
    } else {
      next(err);
    }
  }

  router.delete('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.sendStatus(204).redirect('/SignIN');
  });

  router.get('/me', (req, res, next) => {
    res.json(req.user);
  });
});

module.exports = router;
