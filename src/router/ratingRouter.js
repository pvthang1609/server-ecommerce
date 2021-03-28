const express = require("express");
const { checkToken } = require("../middleware/verifyToken");
const Rating = require("../model/rating");

const { ratingValidate } = require("../app/validation");

const router = express.Router();

router.post("/", checkToken, async (req, res) => {
  const { error } = ratingValidate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const newRating = new Rating({
    id_product: req.body.id_product,
    id_user: req.user._id,
    star: req.body.star,
    comment: req.body.comment,
  });

  try {
    const saveRating = await newRating.save();
    res.json(saveRating);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ratingList = await Rating.find({ id_product: req.params.id });
    const overallRating =
      ratingList.reduce((sum, item) => sum + item.star, 0) / ratingList.length;
    res.json({
      overallRating: Math.round(overallRating * 10) / 10,
      ratingList: ratingList,
    });
  } catch (error) {
    res.status(400).json({ message: err });
  }
});

module.exports = router;
