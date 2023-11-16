const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: {
      type: String,
      required: false,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    shareCount: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    ImageUrl: {
      type: String,
      default: null,
    },
    approved: {
      type: String,
      default: false,
    },
  },

  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Post = mongoose.model("Post", postSchema);
postSchema.virtual("duration").get(function () {
  const currentTime = new Date();
  const createdAt = this.createdAt;
  const durationInMilliseconds = currentTime - createdAt;

  const hours = Math.floor(durationInMilliseconds / 3600000);
  const minutes = Math.floor((durationInMilliseconds % 3600000) / 60000);
  const seconds = Math.floor((durationInMilliseconds % 60000) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
});

module.exports = Post;
