const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const ContactUs = mongoose.model("Contact", contactSchema);

module.exports = ContactUs;
