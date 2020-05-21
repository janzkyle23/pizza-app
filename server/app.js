const express = require('express');
const orders = require('./api/orders');
const mongoose = require('mongoose');

const app = express();

// parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set up Mongoose connection
const mongoDB = require('./config/keys_dev.js').mongoURI;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDb connected'))
  .catch((err) => console.log(err));

// api endpoints
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/api/orders', orders);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening at port ${port}`));
