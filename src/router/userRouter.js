const express = require("express");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { registerValidate, loginValidate } = require("../app/validation");

const router = express.Router();

router.get("/", async (req, res) => {
  const ids = Object.values(req.query);
  const values = await User.find().where("_id").in(ids).exec();
  if (!values) return res.status(422).json({ errors: "IDs invalid." });
  const idUsers = values.map((item) => {
    return { id: item._id, name: item.name };
  });
  res.json(idUsers);
});

router.post("/register", async (req, res) => {
  //Validation before post data on server
  const { error } = registerValidate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //BCRYPT
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  //Create new user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPass,
    urlAvatar: req.body.urlAvatar,
  });
  try {
    const saveUser = await newUser.save();
    res.json({ message: `Đã đăng kí tài khoản ${saveUser.name} thành công!` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidate(req.body);
  if (error) return res.json({ errors: error.details[0].message });

  const infoUser = await User.findOne({ email: req.body.email });
  if (!infoUser) return res.status(422).json({ error: "Email does not exist" });

  const checkPass = await bcrypt.compare(req.body.password, infoUser.password);
  if (!checkPass)
    return res.status(442).json({ error: "password is wrong..!" });

  const { _id, isAdmin } = infoUser;
  jwt.sign(
    { _id: _id, isAdmin: isAdmin },
    process.env.SECRET_KEY,
    function (err, token) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({ infoUser, token });
    }
  );
});

module.exports = router;
