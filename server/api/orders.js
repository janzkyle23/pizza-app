const express = require('express');
const router = express.Router();

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', (req, res) => res.json({ msg: 'GET Hello World!' }));

router.post('/', (req, res) => res.json({ msg: 'POST Hello World!' }));

module.exports = router