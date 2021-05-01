const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

const ProductRouter = require("./router/productRouter");
const UserRouter = require("./router/userRouter");
const DiscountRouter = require("./router/discountRouter");
const PayRouter = require("./router/payRouter");
const OrderRouter = require("./router/orderRouter");
const RatingRouter = require("./router/ratingRouter");

const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  process.env.DB_HOST,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("conneted..!")
);

app.use("/order", OrderRouter);
app.use("/pay", PayRouter);
app.use("/discount", DiscountRouter);
app.use("/product", ProductRouter); //fix name finally
app.use("/user", UserRouter);
app.use("/rating", RatingRouter);

app.listen(process.env.PORT || 5000, console.log("server is running.!"));
