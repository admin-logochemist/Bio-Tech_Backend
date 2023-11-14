const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    approved: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const Country = mongoose.model("Country", contactSchema);

module.exports = Country;
