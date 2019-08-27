// apis/users.js
const router = require('express').Router();
const Assets = require('../../db/Assets');

// matches GET requests to /api/assets/
router.get('/:userId', async (req, res, next) => {
  try {
    const portfolio = await Assets.findAll({
      where: {
        UserId: req.params.userId
      }
    });
    res.send(portfolio);
  } catch (err) {
    next(err);
  }
});

// returns asset in portfolio
router.get('/:userId/:tickerSymbol/', async (req, res, next) => {
  try {
    const asset = await Assets.findOne({
      where: {
        UserId: req.params.userId,
        tickerSymbol: req.params.tickerSymbol
      }
    });
    res.send(asset);
  } catch (err) {
    next(err);
  }
});

// matches POST requests to /api/assets/
// axios.post(`/assets/`, quote, qty)
router.post('/:userId', async (req, res, next) => {
  try {
    await Assets.create({
      tickerSymbol: req.body.tickerSymbol,
      qty: req.body.qty,
      totalValue: req.body.totalValue,
      UserId: req.params.userId
    });
    res.send(next)
  } catch (err) {
    console.error(err);
  }
});

// matches PUT requests to /api/assets/
router.put('/:userId', async (req, res, next) => {
  try {
    await Assets.update(
      {
        qty: req.body.qty,
        totalValue: req.body.totalValue,
      },
      {
        returning: true,
        where: {
          UserId: req.params.userId,
          tickerSymbol: req.body.tickerSymbol
        }
      }
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
