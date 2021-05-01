const mongoose = require("mongoose");

// Create schema

const productSchema = new mongoose.Schema({
  name: String,
  price: {
    type: Number,
    min: 0,
  },
  brand: {
    type: String,
    default: "no-brand",
  },
  type: {
    type: String,
  },
  gender: {
    type: String,
    default: "unisex",
  },
  tag: {
    type: String,
    default: null,
  },
  img: [String],
  desc: String,
  timeInit: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema, "products");
