const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  no: String,
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
  payment: {
    type: [Object],
  },
  status: String,
  logistics: String,
  timeInit: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema, "invoice");
