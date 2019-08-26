// apis/users.js
const router = require('express').Router();
const Assets = require('../../db/Assets');

// matches GET requests to /api/assets/
router.get('/', async (req, res, next) => {
  try {
    if (!req.session.userId) res.sendStatus(404);
    const portfolio = await Assets.findByUserId(req.session.userId);
    res.send(portfolio);
  } catch (err) {
    next(err);
  }
});

router.get('/:tickerSymbol/', async (req, res, next) => {
  try {
    if (!req.session.userId) res.sendStatus(404);
    const asset = await Assets.findOne({
      where: {
        userId: req.session.userId,
        tickerSymbol: req.params.tickerSymbol
      }
    });
    res.send(asset.qty);
  } catch (err) {
    next(err);
  }
});

// matches POST requests to /api/assets/
// axios.post(`/assets/`, quote, qty)
router.post('/', async (req, res, next) => {
  try {
    if (!req.session.userId) res.sendStatus(404);
    await Assets.create({
      tickerSymbol: req.body.quote.tickerSymbol,
      qty: req.body.qty,
      userId: req.session.userId
    });
    res.status(200);
  } catch (err) {
    console.error(err);
  }
});

// matches PUT requests to /api/assets/
// axios.post(`/assets/`, {quote, newQty}) -- calc newQty by axios.geting the existing quantity
router.put('/', async (req, res, next) => {
  try {
    if (!req.session.userId) res.sendStatus(404);
    await Assets.update(
      {
        qty: req.body.newQty
      },
      {
        returning: true,
        where: {
          userId: req.session.userId,
          tickerSymbol: req.body.quote.tickerSymbol
        }
      }
    );
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
