const db = require("../models");
const { sendEmail } = require("../helpers/mailer");

const createContact = async (req, res) => {
  try {
    const { email, firstName, message, phone } = req.body;
    const newContact = new db.contactModel({
      email,
      firstName,
      message,
      phone,
    });

    await newContact.save();
    if (newContact._id) {
      const reply = await sendEmail(email);
    }
    return res.status(201).json({
      success: true,
      message: "Message Sent Successfully",
      data: {
        _id: newContact._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to send the contact message.",
      error: error.message,
    });
  }
};

const getContact = async (req, res) => {
  try {
    const allMessages = await db.contactModel.find();
    return res.status(200).json({
      success: true,
      message: "Contact messages retrieved successfully",
      data: allMessages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to get the contact messages.",
      error: error.message,
    });
  }
};
const getContactById = async (req, res) => {
  try {
    const allMessages = await db.contactModel.findOne({ _id: req.params._id });
    return res.status(200).json({
      success: true,
      message: "Contact messages retrieved successfully",
      data: allMessages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to get the contact messages.",
      error: error.message,
    });
  }
};

module.exports = {
  createContact,
  getContact,
  getContactById,
};
