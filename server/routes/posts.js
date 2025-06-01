const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const { 
    createPost, 
    getPosts, 
    getUserPosts, 
    getPostById,
    deletePost,
    uploadMiddleware 
} = require('../controllers/postController');

// Create a new post
router.post('/', [verifyToken, uploadMiddleware], createPost);

// Get all posts
router.get('/', getPosts);

// Get user's posts
router.get('/user', verifyToken, getUserPosts);

// Get a specific post
router.get('/:id', getPostById);

// Delete a post
router.delete('/:id', verifyToken, deletePost);

module.exports = router;

