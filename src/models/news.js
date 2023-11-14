const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    imageType: {
      type: String,
      required: true,
      enum: ["right", "left"],
    },
    typeId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"NewsTypes"
       
    }
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);

module.exports = News;
