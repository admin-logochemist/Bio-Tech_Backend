const path = require("path");
const express = require("express");
// require('dotenv').config()
const cors = require("cors");

// Routes
const routes = require('./routes');

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

app.use('/api', routes);
module.exports = app; 
