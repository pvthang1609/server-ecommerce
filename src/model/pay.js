const mongoose = require("mongoose");

const paySchema = new mongoose.Schema({
  user: {
    type: String,
    default: "user123",
  },
  transID: String,
  item: String,
  embedData: String,
  amount: Number,
});

module.exports = mongoose.model("Pay", paySchema, "pay");
