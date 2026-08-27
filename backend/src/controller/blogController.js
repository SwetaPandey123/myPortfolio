const BlogModel = require('../models/blogModel');

// Public: Get all blogs sorted by newest
const GetAllBlogs = async (req, res) => {
    try {
        const blogs = await BlogModel.find().sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            message: "All blogs fetched successfully",
            data: blogs
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Public: Get single blog by ID
const GetBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: blog
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Admin Protected: Create new blog
const CreateBlog = async (req, res) => {
    try {
        const { title, content, excerpt, category, readTime, imageURL, author } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required"
            });
        }

        const newBlog = await BlogModel.create({
            title,
            content,
            excerpt: excerpt || content.substring(0, 150) + "...",
            category: category || "Technology",
            readTime: readTime || "5 min read",
            imageURL: imageURL || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
            author: author || "Sweta Pandey"
        });

        return res.status(201).json({
            success: true,
            message: "Blog post published successfully",
            data: newBlog
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Admin Protected: Update blog
const UpdateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedBlog = await BlogModel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog post updated successfully",
            data: updatedBlog
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Admin Protected: Delete blog
const DeleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await BlogModel.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({
                success: false,
                message: "Blog post not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog post deleted successfully",
            data: deletedBlog
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = { GetAllBlogs, GetBlogById, CreateBlog, UpdateBlog, DeleteBlog };
