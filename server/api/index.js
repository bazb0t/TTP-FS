const router = require('express').Router();

console.log(`in router index, u here?`)
router.use('/users', require('./users'));
router.use('/assets', require('./assets'));
router.use('/transactions', require('./transactions'));


// 404 Handling
router.use( (req, res, next) => {
    const err = new Error('Not found.');
    err.status = 404;
    next(err);
  });

module.exports = router;
