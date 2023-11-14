const express = require('express');
const { cloudinary, upload } = require("../helpers/imageUpload");

const router = express.Router();

const newsController = require('../controllers/news');

// Routes
router.post('/add',upload.single('image'), newsController.addNews);
router.post('/addNewsType',newsController.addNewsType)
router.get('/allNews',newsController.getAllNews)
router.get('/newsTypes',newsController.getAllNewsTypes)
router.get('/newsType/:typeId',newsController.getNewsByType)

module.exports = router;
