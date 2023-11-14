const express = require('express');

const router = express.Router();

// Controllers
const authController = require('../controllers/auth');

// Routes
router.post('/signUp', authController.signUp);
router.post('/login', authController.login);

module.exports = router;
