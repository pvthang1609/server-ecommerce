const express = require("express");
const app = express();
const mongoose = require("mongoose");

const ApiRouter = require("./router/apiRouter");
const UserRouter = require("./router/userRouter");
const discountRouter = require("./router/discountRouter");

const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  process.env.DB_HOST,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("conneted..!")
);

app.use("/discount", discountRouter);
app.use("/api", ApiRouter); //fix name finally
app.use("/user", UserRouter);

app.listen(process.env.PORT || 5000, console.log("server is running.!"));
