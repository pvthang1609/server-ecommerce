const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  id_product: String,
  id_user: String,
  star: {
    type: Number,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    minlength: 3,
  },
  timeInit: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Rating", ratingSchema, "rating");
