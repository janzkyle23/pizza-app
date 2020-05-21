const express = require('express');
const router = express.Router();

const Order = require('../model/Order');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (req, res) => {
  Order.find((err, orders) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    res.json(orders);
  });
});

router.post('/', (req, res) => {
  const newOrder = new Order({
    size: 'Small',
    crust: 'Thin',
    toppings: ['Pepperoni', 'Mushrooms', 'Sausage', 'Extra cheese'],
    total: 13,
  });

  newOrder.save((err) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  });

  res.sendStatus(200);
});

module.exports = router;
