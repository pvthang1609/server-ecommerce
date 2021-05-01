const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
  },
  tel: String,
  email: {
    type: String,
  },
  discount: String,
  address: String,
  order: {
    type: [Object],
    minlength: 1,
  },
  payment: String,
  status: String,
  logistics: String,
  timeInit: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema, "order");
