const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const saltRounds = 10;
const createPost = async (req, res) => {
  try {
    const { userId, description, ImageUrl, tags } = req.body;
    const newPost = new db.postModel({
      userId,
      description,
      ImageUrl,
      tags,
    });

    await newPost.save();

    return res.status(201).json({
      success: true,
      message: "Post created Successfully",
      data: newPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to create your account.",
      error: error.message,
    });
  }
};
const likePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    const prevLike = await db.likeModel.findOne({ userId, postId });

    if (prevLike?._id) {
      await db.likeModel.deleteOne({ userId, postId });
      await db.postModel.findOneAndUpdate(
        { _id: postId },
        { $inc: { likeCount: -1 } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Like Removed Successfully",
      });
    } else {
      await db.likeModel.create({ userId, postId });
      const updatedPost = await db.postModel
        .findOneAndUpdate(
          { _id: postId },
          { $inc: { likeCount: 1 } },
          { new: true }
        )
        .populate("userId");

      return res.status(200).json({
        success: true,
        message: "Like Added Successfully",
        data: updatedPost,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};
const getPostById = async (req, res) => {
  try {
    const post = await db.postModel.findById(req.params.id).populate("userId");
    if (post._id) {
      return res.status(200).json({
        success: true,
        message: "Got post successfully",
        data: post,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No post found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};
const getAllPostsByUserId = async (req, res) => {
  try {
    const post = await db.postModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $group: {
          _id: "$userId",
          user: { $first: "$user" },
          posts: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          user: 1,
          posts: {
            $map: {
              input: "$posts",
              as: "post",
              in: {
                duration: "$$post.duration",
                description: "$$post.description",
                likeCount: "$$post.likeCount",
                commentCount: "$$post.commentCount",
                shareCount: "$$post.shareCount",
                tags: "$$post.tags",
                ImageUrl: "$$post.ImageUrl",
                approved: "$$post.approved",
                createdAt: "$$post.createdAt",
                updatedAt: "$$post.updatedAt",
              },
            },
          },
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Got all post for this successfully",
      data: post[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};

const getLikeUsers = async (req, res) => {
  try {
    const users = await db.likeModel.aggregate([
      { $match: { postId: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      { $unwind: { path: "$userId", preserveNullAndEmptyArrays: true } },
      {
        $match: { userId: { $exists: true } },
      },
      {
        $replaceRoot: { newRoot: "$userId" },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "An error occurred while processing your request.",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};
const commentPost = async (req, res) => {
  try {
    const { userId, postId, parentId, comment } = req.body;
    let updatedPost;
    let newComment;
    if (parentId) {
      const prevComment = await db.commentModel.findOne({ _id: parentId });
      if (prevComment?._id) {
        console.log("In if ========>");
        const comm = await db.commentModel.create({
          userId,
          postId,
          comment,
          parentId,
        });

        await db.commentModel.updateOne(
          { _id: parentId },
          { $inc: { replyCount: 1 } }
        );
        newComment = await db.commentModel
          .findOne({ _id: comm?._id })
          .populate("parentId");
      } else {
        return res.status(400).json({
          success: false,
          message: "No comment Found",
        });
      }
    } else {
      newComment = await db.commentModel.create({
        userId,
        postId,
        comment,
      });
    }
    if (newComment?._id) {
      updatedPost = await db.postModel
        .findOneAndUpdate(
          { _id: postId },
          { $inc: { commentCount: 1 } },
          { new: true }
        )
        .populate("userId");
    }
    return res.status(200).json({
      success: true,
      message: `${
        parentId ? "Reply added to comment" : "Comment Added to post"
      } Added Successfully`,
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};
const deleteComment = async (req, res) => {
  try {
    const { parentId, postId, userId, commentId } = req.params;
    let post;
    const deleted = await db.commentModel.findAndDeleteMany({
      $or: [{ _id: commentId }, { parentId: commentId }],
    });
    if (parentId) {
      await db.commentModel.findOneAndUpdate(
        { _id: parentId },
        { $inc: { replyCount: -1 } },
        { new: true }
      );
    }
    post = await db.postModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { commentCount: -(deleted?.length ?? 0) } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: `${
        parentId ? "Reply deleted from comment" : "Comment removed from post"
      } successfully`,
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};
const getCommentsByPostId = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await db.commentModel.aggregate([
      {
        $match: { postId: new mongoose.Types.ObjectId(postId), parentId: null },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
      { $unwind: "$userId" },
      {
        $graphLookup: {
          from: "comments",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parentId",
          as: "replies",
        },
      },
      {
        $unwind: "$replies",
      },
      {
        $lookup: {
          from: "users",
          localField: "replies.userId",
          foreignField: "_id",
          as: "replies.userId",
        },
      },
      {
        $unwind: "$replies.userId",
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" }, 
          postId: { $first: "$postId" },
          parentId: { $first: "$parentId" },
          likeCount: { $first: "$likeCount" },
          comment: { $first: "$comment" },
          replyCount: { $first: "$replyCount" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          replies: { $push: "$replies" },
          // Add other fields if needed
        },
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          parentId: 1,
          likeCount: 1,
          comment: 1,
          replyCount: 1,
          createdAt: 1,
          "replies._id": 1,
          "replies.userId": 1,
          "replies.parentId": 1,
          "replies.likeCount": 1,
          "replies.comment": 1,
          "replies.createdAt": 1,
        },
      },
      { $sort: { createdAt: -1 } },
    ]);
    return res.status(200).json({
      success: true,
      message: `Got Comments Successfully`,
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request.",
      error: error.message,
    });
  }
};
module.exports = {
  createPost,
  getPostById,
  getAllPostsByUserId,
  likePost,
  commentPost,
  getCommentsByPostId,
  deleteComment,
  getLikeUsers,
};
