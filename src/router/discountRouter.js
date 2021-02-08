const { date } = require("@hapi/joi");
const express = require("express");
const router = express.Router();
const Discount = require("../model/discount");

router.get("/", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(403).json({ errors: "403" });
  const codeFilter = code ? { code: code } : null;
  try {
    const response = await Discount.find(codeFilter);
    if (!response[0]) {
      return res.status(402).json({ errors: "Mã giảm giá không tồn tại." });
    }
    const applyTime = new Date(response[0].applyTime);
    if (applyTime.getTime() < Date.now()) {
      return res.status(402).json({ errors: "Mã giảm giá đã hết hạn." });
    }
    if (response[0].amount <= 0) {
      return res.status(402).json({ errors: "Số lượng mã giảm giá đã hết." });
    }
    return res.json({ ...response });
  } catch (err) {
    return res.status(400).json({ errors: err.message });
  }
});
module.exports = router;
