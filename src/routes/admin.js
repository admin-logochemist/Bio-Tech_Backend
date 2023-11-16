const express = require("express");

const router = express.Router();

// Controllers
const adminController = require("../controllers/admin");

// Routes

// countries
router.post("/country", adminController.createCountry);
router.get("/getAllCountries", adminController.getAllCountries);
router.get("/getCountryById/:id", adminController.getCountryById);

// user
router.get("/getAllUsers", adminController.getAllUsers);
router.delete("/deleteUserById/:id", adminController.deleteUserById);
router.get("/getUserById/:id", adminController.getUserById);

//contacts
router.get("/getAllContacts", adminController.getAllContacts);
router.get("/getContactById/:id", adminController.getContactById);

module.exports = router;
