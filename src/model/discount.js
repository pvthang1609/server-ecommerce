const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  code: String,
  percent: Number,
  amount: Number,
  applyTime: Date,
});

module.exports = mongoose.model("Discount", discountSchema, "discount");
