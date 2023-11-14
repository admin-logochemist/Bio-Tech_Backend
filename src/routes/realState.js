const express = require('express');

const router = express.Router();

const realStateController = require('../controllers/realState');

// Routes
router.post('/service',realStateController.addStateService)
router.get('/getServices',realStateController.getAllStateServices)
router.post('/contactState',realStateController.createContactWithRealState)


module.exports = router;
