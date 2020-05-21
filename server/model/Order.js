const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
  },
  crust: {
    type: String,
    enum: ['Thin', 'Thick'],
  },
  toppings: [String],
  amount: Number,
});

module.exports = mongoose.model('Order', orderSchema);
