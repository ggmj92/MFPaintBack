const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
    {
        title: String,
        subtitle: String,
        body: String,
        author: String, 
        image: String,
    }, { timestamps: true }
);

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;