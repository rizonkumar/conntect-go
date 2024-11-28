const dotenv = require("dotenv");
// Load env variables first
dotenv.config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
