const express = require('express');
const { GetAllBlogs, GetBlogById, CreateBlog, UpdateBlog, DeleteBlog } = require('../controller/blogController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', GetAllBlogs);
router.get('/:id', GetBlogById);
router.post('/create', authMiddleware, CreateBlog);
router.put('/update/:id', authMiddleware, UpdateBlog);
router.delete('/delete/:id', authMiddleware, DeleteBlog);

module.exports = router;
