const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    count: {
        type: Number,
        required: true,
        default: 0,
      },
  },
  {
    timestamps: true,
  }
);

const Services = mongoose.model("Services", serviceSchema);

module.exports = Services;
