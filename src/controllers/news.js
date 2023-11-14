const { cloudinary, upload } = require("../helpers/imageUpload");
const db = require("../models");

const addNews = async (req, res) => {
  try {
    const { heading, description, imageType, typeId } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    const image = result.secure_url;

    const news = db.newsModel({
      heading,
      description,
      imageType,
      image,
      typeId,
    });
    await news.save();
    return res.status(201).json({
      success: true,
      message: "News Added Successfully",
      data: {
        _id: news._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to save the contact message.",
      error: error.message,
    });
  }
};
const addNewsType = async (req, res) => {
  try {
    const { name } = req.body;
    const newsType = new db.newsTypeModel({ name });

    await newsType.save();

    return res.status(201).json({
      success: true,
      message: "News Type Added Successfully",
      data: {
        _id: newsType._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to add the news.",
      error: error.message,
    });
  }
};

const getAllNews = async (req, res) => {
  try {
    const allNews = await db.newsModel.find().populate("typeId");
    return res.status(200).json({
      success: true,
      message: "All News retrieved successfully",
      data: allNews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to get the news .",
      error: error.message,
    });
  }
};

const getAllNewsTypes = async (req, res) => {
  try {
    const allNews = await db.newsTypeModel.find();
    return res.status(200).json({
      success: true,
      message: "All News Types retrieved successfully",
      data: allNews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to get the news types.",
      error: error.message,
    });
  }
};
const getNewsByType = async (req, res) => {
  try {
    const type = await db.newsTypeModel.findOne({ _id: req.params.typeId });
    if (type?._id) {
      const allNews = await db.newsModel
        .find({ typeId: req.params.typeId })
        .sort({ createdAt: 1 });
      return res.status(200).json({
        success: true,
        message: "All News Types retrieved successfully",
        data: allNews,
      });
    } else {
      return res.status(400).json({
        success: true,
        message: "No type existed for this typeId",
        data: allNews,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `An error occurred while trying to get the news by type`,
      error: error.message,
    });
  }
};

module.exports = {
  addNews,
  addNewsType,
  getAllNews,
  getAllNewsTypes,
  getNewsByType,
};
