const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large'],
    required: true,
  },
  crust: {
    type: String,
    enum: ['Thin', 'Thick'],
    required: true,
  },
  toppings: [String],
  amount: {
    type: Number,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
