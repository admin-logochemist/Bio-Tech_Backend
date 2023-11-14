const express = require('express');

const router = express.Router();

const contactController = require('../controllers/contact');

// Routes
router.post('/', contactController.createContact);
router.get('/getAll',contactController.getContact)
router.post('/contactRealState',contactController.createContactWithRealState)


module.exports = router;
