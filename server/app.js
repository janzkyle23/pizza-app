const express = require('express');
const cors = require('cors');
const orders = require('./api/orders');
const mongoose = require('mongoose');

const app = express();

// enable cors for all origins
app.use(cors());
// parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set up Mongoose connection
const mongoDB =
  process.env.NODE_ENV === 'production'
    ? process.env.mongoURI
    : 'mongodb://mongo:27017/pizza-dev';
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDb connected'))
  .catch((err) => console.log(err));

// api endpoint
app.use('/api/orders', orders);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening at port ${port}`));
