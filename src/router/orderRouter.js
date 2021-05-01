const express = require("express");
const Order = require("../model/order");
const { orderValidate } = require("../app/validation");
const transporter = require("../app/nodemailer");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = orderValidate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  //create
  const newOrder = new Order({
    address: req.body.address,
    discount: req.body.discount,
    email: req.body.email,
    logistics: req.body.logistics,
    name: req.body.name,
    order: req.body.order,
    payment: req.body.payment,
    status: req.body.status,
    tel: req.body.tel,
  });

  try {
    const saveOrder = await newOrder.save();

    const mail = await transporter.sendMail({
      from: "pvthang1609@gmail.com",
      to: req.body.email,
      subject: `August Store - Đơn hàng #${saveOrder._id}`,
      html: `<h1>Đơn đặt hàng của bạn đang được sắp xếp, vui lòng để ý điện thoại của mình để nhận được cuộc gọi xác nhận từ chúng tôi</h1>`,
    });

    res.json({
      message: `Đã tạo đơn hàng ${saveOrder._id} thành công. Thông tin đơn hàng được gửi về email: ${saveOrder.email}`,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }

  // khi xác nhận 1 invoice => trừ số lượng của sản phẩm, mã giảm giá trên sever
});

module.exports = router;
