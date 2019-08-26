// apis/transactions.js
const router = require('express').Router();
const Transactions = require('../../db/Transactions');

// matches GET requests to /api/transactions/
router.get('/:userId', async (req, res, next) => {
  try {
    if (!req.session.userId) res.sendStatus(404);
    const transactions = await Transactions.findByUserId(req.session.userId);
    res.send(transactions);
  } catch (err) {
    next(err);
  }
});

// matches POST requests to /api/transactions/
// axios.post(`/transactions/`, quote, qty, method)
router.post('/', function(req, res, next) {
  try {
    Transactions.create({
      tickerSymbol: req.body.quote.tickerSymbol,
      price: req.body.quote.latestPrice,
      qty: req.body.qty,
      method: req.body.method,
      userId: req.session.userId
    });
    res.status(200);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
