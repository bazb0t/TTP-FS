// apis/transactions.js
const router = require('express').Router();
const Transactions = require('../../db/Transactions');

// matches GET requests to /api/transactions/
router.get('/:userId', async (req, res, next) => {
  try {
    const transactions = await Transactions.findAll({
      where: {
        UserId: req.params.userId
      }
    });
    res.send(transactions);
  } catch (err) {
    next(err);
  }
});

// matches POST requests to /api/transactions/
// axios.post(`/transactions/`, tickerSymbol, price, qty, method)
router.post('/', function(req, res, next) {
  try {
    Transactions.create({
      tickerSymbol: req.body.tickerSymbol,
      price: req.body.price,
      qty: req.body.qty,
      method: req.body.method,
      UserId: req.body.userId
    });
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
