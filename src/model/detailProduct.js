const mongoose = require("mongoose");

const detailProductSchema = new mongoose.Schema({
  id_product: String,
  inventory: {
    type: [Object],
    minlength: 1,
  },
  posts: {
    type: String,
  },
  favorite: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model(
  "detailProduct",
  detailProductSchema,
  "detail-product"
);
