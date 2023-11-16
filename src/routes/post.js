const express = require('express');

const router = express.Router();

// Controllers
const postController = require('../controllers/post');

// Routes
router.post('/post', postController.createPost);
router.get('/:id', postController.getPostById);
router.get('/userId/:id',postController.getAllPostsByUserId)
router.post('/likePost',postController.likePost);
// router.post('/commentPost',postController.commentPost)
// router.get('/getComments/:id',postController.getCommentsByPostId)
router.get('/getLikeUsers/:id',postController.getLikeUsers)

module.exports = router;
