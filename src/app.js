const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

// require('dotenv').config()
const cors = require("cors");
const db = mongoose.connection;
// Routes
const routes = require("./routes");

const app = express();

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(async (req, res, next) => {
  req.dbSession = await db.startSession();
  req.dbSession.startTransaction();
  next();
});

// ... API routes

app.use(async (req, res, next) => {
  await req.dbSession.commitTransaction();
  req.dbSession.endSession();
  next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*", // or specify your specific origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options("*", cors());

app.use("/api", routes);
module.exports = app;
