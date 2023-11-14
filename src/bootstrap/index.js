const mongoose = require("mongoose");
require('dotenv').config();

const url = process.env.MONGODB_URL;
exports.bootstrap = async () => {
  try {
    await mongoose.connect(url).then(() => {
      console.log(`Mongodb connected to host: ${url}`);
    });
  } catch (err) {
    console.error("Error while connecting MongoDB database", err);
    throw err;
  }
  return Promise.resolve(true);
};
