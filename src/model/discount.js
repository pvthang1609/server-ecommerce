const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  code: String,
  condition: Object,
});

module.exports = mongoose.model("Discount", discountSchema, "discount");
