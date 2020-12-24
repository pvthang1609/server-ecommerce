const express = require("express");
const Product = require("../model/product");

const router = express.Router();

router.post("/products", async (req, res) => {
  const newProduct = new Product({
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    mainImg: req.body.mainImg,
    classify: req.body.classify,
    category: req.body.category,
    gender: req.body.gender,
    album: req.body.album,
    desc: req.body.desc,
    info: req.body.info,
  });
  try {
    const saveProduct = await newProduct.save();
    res.json(saveProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/products", async (req, res) => {
  const name = req.query.name || "";
  const category = req.query.category || "";
  const gender = req.query.gender || "";
  const sortOrder = req.query.order || "";
  const page = Number(req.query.page) || 1;

  const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
  const categoryFilter = category ? { category: category } : {};
  const genderFilter = gender ? { gender: gender } : {};
  const orderFilter =
    sortOrder === "lower"
      ? { price: 1 }
      : sortOrder === "higher"
      ? { price: -1 }
      : sortOrder === "mostviews"
      ? { views: 1 }
      : sortOrder === "mostfav"
      ? { favorite: 1 }
      : sortOrder === "newest"
      ? { timeInit: -1 }
      : {};

  const limit = Number(req.query.limit) || 6;

  try {
    const count = await Product.countDocuments({
      ...nameFilter,
      ...categoryFilter,
      ...genderFilter,
    });

    const queryProducts = await Product.find({
      ...nameFilter,
      ...categoryFilter,
      ...genderFilter,
    })
      .limit(limit)
      .skip(limit * (page - 1))
      .sort(orderFilter);
    res.json({
      queryProducts,
      page: page,
      totalPage: Math.ceil(count / limit),
    });
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const queryProducts = await Product.findById(req.params.id);
    res.json(queryProducts);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
