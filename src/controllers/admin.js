const db = require("../models");

const createCountry = async (req, res) => {
  try {
    const { name, imageUrl, approved } = req.body;

    const newCountry = new db.countryModel({
      name,
      imageUrl,
      approved,
    });

    await newCountry.save();
    if (newCountry._id) {
    }

    return res.status(201).json({
      success: true,
      message: "Country Created Successfully",
      data: newCountry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to create a Country.",
      error: error.message,
    });
  }
};
const getAllCountries = async (req, res) => {
  try {
    const allCountries = await db.countryModel.find();
    return res.status(201).json({
      success: true,
      message: "Got Countries Successfully",
      data: allCountries,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to get all Countries.",
      error: error.message,
    });
  }
};
const getCountryById = async (req, res) => {
  try {
    const country = await db.countryModel.findOne({ _id: req.params.id });
    return res.status(201).json({
      success: true,
      message: "Got Country Successfully",
      data: country,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to get this Country.",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await db.userModel.find();
    return res.status(201).json({
      success: true,
      message: "Got User Successfully",
      data: allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to get all Users.",
      error: error.message,
    });
  }
};
 
const getUserById = async (req, res) => {
    try {
      const user = await db.userModel.findOne({ _id: req.params.id });
      return res.status(201).json({
        success: true,
        message: "Got user Successfully",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while trying to get this user.",
        error: error.message,
      });
    }
  };
const deleteUserById = async (req, res) => {
    try {
      const prevUser = await db.countryModel.findOne({ _id: req.params.id });
      if(prevUser?._id){
       await db.countryModel.deleteOne({ _id: req.params.id });

      }
      return res.status(201).json({
        success: true,
        message: "User Deleted Successfully",
   
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while trying to get this Country.",
        error: error.message,
      });
    }
  };
  
const getAllContacts = async (req, res) => {
    try {
      const allContacts = await db.contactModel.find();
      return res.status(201).json({
        success: true,
        message: "Got User Successfully",
        data: allContacts,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while trying to get all Users.",
        error: error.message,
      });
    }
  };
  
const getContactById = async (req, res) => {
    try {
      const contact = await db.contactModel.findOne({ _id: req.params.id });
      return res.status(201).json({
        success: true,
        message: "Got contact Successfully",
        data: contact,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while trying to get this contact.",
        error: error.message,
      });
    }
  };
  
module.exports = {
  createCountry,
  getAllCountries,
  getCountryById,
  getAllUsers,
  getUserById,
  deleteUserById,
  getAllContacts,
  getContactById
};
