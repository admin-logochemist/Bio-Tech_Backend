const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    parentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        default:null
    },
    likeCount:{ 
        type: Number,
        default: 0,
    },
    comment: {
      type: String,
      required: true,
    },
    replyCount: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
