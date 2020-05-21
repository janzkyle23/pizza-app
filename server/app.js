const express = require('express');
const orders = require('./api/orders');
const mongoose = require('mongoose');

const app = express();

//set up Mongoose connection
// const mongoDB = 'mongodb://127.0.0.1/pizza_test';
const mongoDB = require('./config/keys_dev.js').mongoURI;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDb connected'))
  .catch((err) => console.log(err));
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// api endpoints
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/orders', orders);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening at port ${port}`));
