const express = require('express');

const router = express.Router();

// Controllers
const pingController = require('../controllers/ping');

// Routes
router.get('/', pingController.ping);

module.exports = router;
