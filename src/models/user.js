const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    countryRegion: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Country",
    },
    termsAndServices: {
      type: Boolean,
      required: true,
      default: false,
    },
    token: {
      type: String,
      default:''
    //   required: true,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", contactSchema);

module.exports = User;
