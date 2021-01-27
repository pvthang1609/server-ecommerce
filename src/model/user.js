const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    min: 6,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    min: 6,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 255,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  timeInt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema, "user");
