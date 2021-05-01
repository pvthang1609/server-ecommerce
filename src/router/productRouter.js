const express = require("express");
const Product = require("../model/product");
const DetailProduct = require("../model/detailProduct");
const { checkAdmin } = require("../middleware/verifyToken");
const { productValidate, detailProductValidate } = require("../app/validation");

const router = express.Router();

router.post("/", checkAdmin, async (req, res) => {
  const { productError } = productValidate(req.body);
  const { detailError } = detailProductValidate(req.body);
  if (productError || detailError)
    return res.status(400).json({
      error:
        productError?.details[0].message ??
        detailError?.details[0].message ??
        null,
    });

  const {
    name,
    price,
    type,
    brand,
    gender,
    img,
    desc,
    tag,
    inventory,
    posts,
  } = req.body;

  const newProduct = new Product({
    name: name,
    price: price,
    type: type,
    brand: brand,
    gender: gender,
    img: img,
    desc: desc,
    tag: tag,
  });
  try {
    const saveProduct = await newProduct.save();
    const newDetailProduct = new DetailProduct({
      id_product: saveProduct._id,
      inventory: inventory,
      posts: posts,
    });
    const saveDetailProduct = await newDetailProduct.save();
    res.json({ message: ` ID : ${saveDetailProduct.id_product} success.` });
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const name = req.query.name || "";
  const gender = req.query.gender || "";
  const type = req.query.type || "";
  const brand = req.query.brand || "";
  const sortOrder = req.query.sortOrder || "";
  const page = Number(req.query.page) || 1;

  const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};
  const genderFilter = gender ? { gender: gender } : {};
  const typeFilter = type ? { type: type } : {};
  const brandFilter = brand ? { brand: brand } : {};
  const orderFilter =
    sortOrder === "lower"
      ? { price: -1 }
      : sortOrder === "higher"
      ? { price: 1 }
      : sortOrder === "mostviews"
      ? { favorite: 1 }
      : sortOrder === "newest"
      ? { timeInit: 1 }
      : {};

  const limit = Number(req.query.limit) || 6;

  try {
    const count = await Product.countDocuments({
      ...nameFilter,
      ...brandFilter,
      ...typeFilter,
      ...genderFilter,
    });

    const queryProducts = await Product.find({
      ...nameFilter,
      ...brandFilter,
      ...typeFilter,
      ...genderFilter,
    })
      .limit(limit)
      .skip(limit * (page - 1))
      .sort(orderFilter);
    return res.json({
      queryProducts,
      page: page,
      totalPage: Math.ceil(count / limit),
    });
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const queryProducts = await Product.findById(req.params.id);
    res.json(queryProducts);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});

//delete
router.delete("/:id", checkAdmin, async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.json({ message: `Deleted product with id: ${req.params.id}` });
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});

module.exports = router;
