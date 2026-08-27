const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    excerpt: {
        type: String
    },
    category: {
        type: String,
        default: "Technology"
    },
    readTime: {
        type: String,
        default: "5 min read"
    },
    imageURL: {
        type: String
    },
    author: {
        type: String,
        default: "Sweta Pandey"
    }
}, {
    timestamps: true
});

const BlogModel = mongoose.model('Blog', BlogSchema);
module.exports = BlogModel;
