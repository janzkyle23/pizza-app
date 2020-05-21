const express = require('express');
const orders = require('./api/orders');

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/orders', orders);

app.listen(port, () => console.log(`Server listening at port ${port}`));
