const contactModel = require("../routes/contact");
const db = require("../models");

// to be
const getContactByStateId = async (req, res) => {
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
const getAllStateServices = async (req, res) => {
  try {
    const services = await db.serviceModel.find();
    return res.status(200).json({
      success: true,
      message: "Services retrieved successfully",
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to get the services.",
      error: error.message,
    });
  }
};
const createContactWithRealState = async (req, res) => {
  try {
    const { email, name, message, phone, type, serviceId, reciever } = req.body;
    const newContact = new db.contactModel({
      email,
      name,
      message,
      phone,
      type,
      serviceId,
      reciever,
    });

    await newContact.save();

    return res.status(201).json({
      success: true,
      message: "Message Sent To Real State Successfully",
      data: {
        _id: newContact._id,
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

 
const addStateService = async (req, res) => {
  try {
    const { name } = req.body;
    const newService = new db.serviceModel({ name });

    await newService.save();

    return res.status(201).json({
      success: true,
      message: "Service added successfully",
      data: {
        _id: newService._id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to add the service",
      error: error.message,
    });
  }
};
module.exports = {
  createContactWithRealState,
  addStateService,
  getAllStateServices,
};
