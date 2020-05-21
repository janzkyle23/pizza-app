const express = require('express');
const router = express.Router();

const Order = require('../model/Order');

router.use((req, res, next) => {
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
  const { size, crust, toppings } = req.body;

  const sizePrice = { Small: 8, Medium: 10, Large: 12 };
  const crustPrice = { Thin: 2, Thick: 4 };
  const toppingsLength = toppings ? toppings.length : 0;
  const amount =
    sizePrice[size] +
    crustPrice[crust] +
    (toppingsLength > 3 ? (toppingsLength - 3) * 0.5 : 0);

  const newOrder = new Order({ size, crust, toppings, amount });

  newOrder.save((err, order) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      console.log(order);
      res.sendStatus(200);
    }
  });
});

module.exports = router;
