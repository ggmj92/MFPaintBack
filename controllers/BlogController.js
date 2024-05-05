const { update } = require('firebase/database');
const Blog = require('../models/Blog');
const upload = require('../middleware/firebaseUploadMiddleware');

const BlogController = {

    // GET ALL BLOG POSTS
    async getAll(req, res) {
        try {
            const blog = await Blog.find();
            res.json(blog);
        } catch (error) {
            console.log(error);
        }
    },

    // GET BLOG POST BY ID
    async getById(req, res) {
        try {
            const id = req.params._id;
            const blogPost = await Blog.findById(id);
            res.json(blogPost)
        } catch (error) {
            console.log(error);
        }
    },

    // CREATE BLOG POST
    async createBlogPost(req, res) {
        try {
            let blogData = req.body;

            if (req.file) {
                blogData.image = req.file.downloadURL;
            }
            const blogPost = await Blog.create(blogData);
            res.status(201).send(blogPost)

        } catch (error) {
            console.log(error);
            res.status(500).send({ error: error.message });
        }
    },

    // UPDATE BLOG POST
    async updateBlogPost(req, res) {
        try {
            const id = req.params._id;
            const updateData = req.body;

            const existingBlogPost = await Blog.findById(id);
            if (!existingBlogPost) {
                return res.status(404).json({ message: "This blog post does not exist." });
            }

            existingBlogPost.title = updateData.title || existingBlogPost.title;
            existingBlogPost.subtitle = updateData.subtitle || existingBlogPost.subtitle;
            existingBlogPost.body = updateData.body || existingBlogPost.body;
            existingBlogPost.author = updateData.author || existingBlogPost.author;

            if (req.file && req.file.downloadURL) {
                existingBlogPost.image = req.file.downloadURL;
            }

            await existingBlogPost.save();

            res.status(200).json({ message: "Blog post updated successfully.", updateBlogPost: existingBlogPost });


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    },

    // DELETE BLOG POST
    async deleteBlogPost(req, res) {
        try {
            const id = req.params._id;
            const blogPost = await Blog.findByIdAndDelete(id);
            if (!blogPost) {
                return res.status(404).json({ message: "This blog post does not exist." });
            }
            res.status(200).json({ message: "Blog post deleted successfully.", blogPost });
        } catch (error) {
            console.error("Error deleting blog post: ", error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async search(searchTerm) {
        const blogPosts = await Blog.find({
          $or: [
            { title: new RegExp(searchTerm, 'i') },
            { subtitle: new RegExp(searchTerm, 'i') },
            { body: new RegExp(searchTerm, 'i') },
            { author: new RegExp(searchTerm, 'i') },
            { image: new RegExp(searchTerm, 'i') },
          ],
        });
        return blogPosts;
      },
};

module.exports = BlogController, upload;