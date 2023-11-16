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
    const prevLike = await db.userModel.findOne({ userId, postId });

    if (prevLike?._id) {
      await db.likeModel.deleteOne({ userId, postId });
      await db.postModel.findOneAndUpdate(
        { _id: postId },
        { $inc: { likeCount: -1 } }
      );

      return res.status(200).json({
        success: true,
        message: "Like Removed Successfully",
      });
    } else {
      await db.likeModel.create({ userId, postId });
      const updatedPost = await db.postModel
        .findOneAndUpdate({ _id: postId }, { $inc: { likeCount: 1 } })
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
          as: "user",
        },
      },
      { $unwind: "$user" },
      {$group:""}
    ]);
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
  //   commentPost,
  //   getCommentsByPostId,
  getLikeUsers,
};
