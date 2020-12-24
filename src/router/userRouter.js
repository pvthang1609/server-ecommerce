const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const { registerValidate, loginValidate } = require("../app/validation");

const router = express.Router();

router.post("/register", async (req, res) => {
  //Validation before post data on server
  const { error } = registerValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //BCRYPT
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  //Create new user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPass,
  });
  try {
    const saveUser = await newUser.save();
    res.json(saveUser);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const findEmail = await User.findOne({ email: req.body.email });
  if (!findEmail) return res.status(400).send("Email does not exist.");

  const checkPass = await bcrypt.compare(req.body.password, findEmail.password);
  if (checkPass) return res.send("you are login..!");

  res.send("password is wrong..!");
});

module.exports = router;
