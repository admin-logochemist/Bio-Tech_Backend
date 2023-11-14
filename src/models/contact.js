const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
    },
    phone: {
      type: String,
      default: null,
    },
    reciever: { type: String, default: "Us" },
    type: {
      type: String,
      default: "support",
    },
  },

  {
    timestamps: true,
  }
);

const ContactUs = mongoose.model("Contact", contactSchema);

module.exports = ContactUs;
