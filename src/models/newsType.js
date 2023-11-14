const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
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
    approved: {
      type: Boolean,
      default: false,
    },
    approvedDate: {
      type: Date,
      default: null,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("NewsTypes", newsSchema);

module.exports = News;
