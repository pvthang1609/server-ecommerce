const express = require("express");
const moment = require("moment");
const CryptoJS = require("crypto-js");
const axios = require("axios").default;
require("dotenv").config();

const router = express.Router();

axios.defaults.headers.post["Content-Type"] = "application/json";

router.post("/zalopay", async (req, res) => {
  const { user, transID, item, amount, embedData } = req.body; //convert to stringfy from client
  try {
    //create req send to sever zalopay
    const order = {
      appid: "554",
      apptransid: `${moment().format("YYMMDD")}_${transID}`,
      appuser: user,
      apptime: Date.now(),
      amount: amount,
      description: `August Store - Thanh toán đơn hàng #${transID}`,
      embeddata: JSON.stringify(embedData),
      item: JSON.stringify(item),
      bankcode: "zalopayapp",
    };
    const data =
      order.appid +
      "|" +
      order.apptransid +
      "|" +
      order.appuser +
      "|" +
      order.amount +
      "|" +
      order.apptime +
      "|" +
      order.embeddata +
      "|" +
      order.item;
    order.mac = CryptoJS.HmacSHA256(data, process.env.KEY1).toString();
    const response = await axios.post(
      "https://sandbox.zalopay.com.vn/v001/tpe/createorder",
      null,
      { params: order }
    );
    res.json(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/zalopay/callback", (req, res) => {
  const result = {};
  try {
    const dataStr = req.body.data;
    const reqMac = req.body.mac;
    const mac = CryptoJS.HmacSHA256(dataStr, process.env.KEY2).toString();

    //check mac
    if (reqMac !== mac) {
      result.returncode = -1;
      result.returnmessage = "Mac không đúng!";
    } else {
      result.returncode = 1;
      result.returnmessage = "Thành công!";
    }
  } catch (err) {
    result.returncode = 0;
    result.returnmessage = err.message;
  }

  res.json(result);
});

module.exports = router;
