const mongoose = require("mongoose");

// Create schema

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  price: {
    type: Number,
    min: 0,
  },
  collections: {
    type: String,
  },
  type: {
    type: String,
  },
  gender: String,
  tag: {
    type: String,
    default: null,
  },
  img: [String],
  views: {
    type: Number,
    default: 0,
  },
  favorite: {
    type: Number,
    default: 0,
  },
  desc: String,
  info: [{ code: String, size: Number, inventory: Number }],
  timeInit: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema, "products");
