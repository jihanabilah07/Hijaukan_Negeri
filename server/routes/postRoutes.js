const express = require('express');
const router = express.Router();
const { createPost, getPosts, getUserPosts, getPostById, uploadMiddleware } = require('../controllers/postController');
const { verifyToken } = require('../middleware/auth');

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);

// Protected routes (require authentication)
router.post('/', verifyToken, uploadMiddleware, createPost);
router.get('/user/me', verifyToken, getUserPosts);

module.exports = router;
