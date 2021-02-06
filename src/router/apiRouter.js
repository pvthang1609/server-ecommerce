const express = require("express");
const Product = require("../model/product");

const router = express.Router();

router.post("/products", async (req, res) => {
  const newProduct = new Product({
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    type: req.body.type,
    collections: req.body.collections,
    gender: req.body.gender,
    img: req.body.img,
    desc: req.body.desc,
    info: req.body.info,
  });
  try {
    const saveProduct = await newProduct.save();
    res.json(saveProduct);
  } catch (err) {
    res.json({ errors: err.message });
  }
});

router.get("/products", async (req, res) => {
  const name = req.query.name || "";
  const gender = req.query.gender || "";
  const type = req.query.type || "";
  const collections = req.query.collections || "";
  const sortOrder = req.query.sortOrder || "";
  const page = Number(req.query.page) || 1;

  const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
  const genderFilter = gender ? { gender: gender } : {};
  const typeFilter = type ? { type: type } : {};
  const collectionsFilter = collections ? { collections: collections } : {};
  const orderFilter =
    sortOrder === "lower"
      ? { price: -1 }
      : sortOrder === "higher"
      ? { price: 1 }
      : sortOrder === "mostviews"
      ? { views: 1 }
      : sortOrder === "mostfav"
      ? { favorite: 1 }
      : sortOrder === "newest"
      ? { timeInit: 1 }
      : {};

  const limit = Number(req.query.limit) || 6;

  try {
    const count = await Product.countDocuments({
      ...nameFilter,
      ...collectionsFilter,
      ...typeFilter,
      ...genderFilter,
    });

    const queryProducts = await Product.find({
      ...nameFilter,
      ...collectionsFilter,
      ...typeFilter,
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
    res.status(422).json({ errors: err.message });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const queryProducts = await Product.findById(req.params.id);
    res.json(queryProducts);
  } catch (err) {
    res.status(422).json({ errors: err.message });
  }
});

module.exports = router;
