const express = require("express");
const Invoice = require("../model/invoice");
const { invoiceValidate } = require("../app/validation");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = invoiceValidate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  //create
  const newInvoice = new Invoice({
    address: req.body.address,
    discount: req.body.discount,
    email: req.body.email,
    logistics: req.body.logistics,
    name: req.body.name,
    no: req.body.no,
    order: req.body.order,
    payment: req.body.payment,
    status: req.body.status,
    tel: req.body.tel,
  });

  try {
    const saveInvoice = await newInvoice.save();
    res.json(saveInvoice);
  } catch (err) {
    res.status(400).json({ message: err });
  }

  // khi xác nhận 1 invoice => trừ số lượng của sản phẩm, mã giảm giá trên sever
});

module.exports = router;
