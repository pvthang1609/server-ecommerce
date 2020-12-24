const express = require("express");
const app = express();
const ApiRouter = require("./router/apiRouter");
const UserRouter = require("./router/userRouter");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  process.env.DB_HOST,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("conneted..!")
);

app.use("/api", ApiRouter);
app.use("/user", UserRouter);

app.listen(5000, console.log("server is running.!"));
