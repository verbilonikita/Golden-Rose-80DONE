const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const DB = "mongodb+srv://Nikita:ff47TuRvrrhfAksQ@cluster0.ozrmq.mongodb.net/golden-rose?retryWrites=true&w=majority";

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log("DB connected"));

express.json();

const Menu = require("./menuSchema");

app.use(cors());

app.get("/api/:type", async (req, res) => {
  try {
    const query = req.params.type;
    const correctValues = ["cake", "brownies", "cheesecake"];
    if (correctValues.some((el) => el === query)) {
      const data = await Menu.find({ type: query });
      res.status(200).json({
        status: "success",
        data,
      });
    } else {
      throw new Error("Failed to find recipe.");
    }
  } catch (err) {
    res.status(404).json({
      status: "critical error",
      message: err,
    });
  }
});

app.all("*", async (req, res) => {
  res.status(404).json({
    status: "fail",
    message: "invalid query, please use /api/cake or search brownie or cheesecake",
  });
});

module.exports = app;
