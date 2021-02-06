const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const auth = require("./verifyToken");

const { registerValidate, loginValidate } = require("../app/validation");

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.headers);

  //Validation before post data on server
  const { error } = registerValidate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

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
  if (error) return res.json({ errors: error.details[0].message });

  const infoUser = await User.findOne({ email: req.body.email });
  if (!infoUser)
    return res.status(422).json({ errors: "Email does not exist" });

  const checkPass = await bcrypt.compare(req.body.password, infoUser.password);
  if (!checkPass)
    return res.status(442).json({ errors: "password is wrong..!" });

  const { _id } = infoUser;
  jwt.sign({ _id: _id }, process.env.SECRET_KEY, function (err, token) {
    if (err) {
      res.status(400).json({ errors: err.message });
      return;
    }
    res.json({ infoUser, token });
  });
});

router.get("/edit", auth, async (req, res) => {
  if (req.user) {
    const { _id } = req.user;
    try {
      const user = await User.findOne({ _id: _id });
      return res.send(user);
    } catch (err) {
      return res.status(400).json({ errors: err.message });
    }
  }
});

module.exports = router;
