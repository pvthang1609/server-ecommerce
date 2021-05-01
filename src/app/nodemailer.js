const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAILL,
    pass: process.env.GPASS,
  },
});

module.exports = transporter;
