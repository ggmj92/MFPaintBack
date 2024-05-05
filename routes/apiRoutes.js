const express = require('express');
const router = express.Router();
const ArtworkController = require('../controllers/ArtworkController');
const ArtistController = require('../controllers/ArtistController');
const BlogController = require('../controllers/BlogController')
const UserController = require('../controllers/UserController')
const { upload, firebaseStorage } = require('../middleware/firebaseUploadMiddleware');

// Artwork API Routes
router.get('/artworks', ArtworkController.getAll);
router.get('/artwork/:_id', ArtworkController.getById);
router.post('/createartwork', upload.single("image"), firebaseStorage('artwork'), ArtworkController.createArtwork);
router.patch('/updateartwork/:_id', upload.single("image"), firebaseStorage('artwork'), ArtworkController.updateArtwork);
router.delete('/deleteartwork/:_id', ArtworkController.deleteArtwork);

// Artist API Routes
router.get('/artists', ArtistController.getAll);
router.get('/artist/:_id', ArtistController.getById);
router.post('/createartist', upload.single("image"), firebaseStorage('artist'), ArtistController.createArtist);
router.patch('/updateartist/:_id', upload.single("image"), firebaseStorage('artist'), ArtistController.updateArtist);
router.delete('/deleteartist/:_id', ArtistController.deleteArtist);

// Blog API Routes
router.get('/blog', BlogController.getAll);
router.get('/blogpost/:_id', BlogController.getById);
router.post('/createblogpost', upload.single("image"), firebaseStorage('blog'), BlogController.createBlogPost);
router.patch('/updateblogpost/:_id', upload.single("image"), firebaseStorage('blog'), BlogController.updateBlogPost)
router.delete('/deleteblogpost/:_id', BlogController.deleteBlogPost);

// User API Routes
router.get('/users', UserController.getAll);
router.get('/user/:_id', UserController.getById);
router.post('/signup', UserController.createUser);
router.patch('/updateuser/:_id', UserController.updateUser);
router.delete('/deleteuser/:_id', UserController.deleteUser);

// Firebase Upload-File Routes
router.post('/upload-image', upload.single("image"), firebaseStorage);

// Search API Route
router.get('/search', async (req, res) => {
  const { searchTerm } = req.query;
  console.log('Received search term:', searchTerm);
  try {
      const artists = await ArtistController.search(searchTerm);
      const artworks = await ArtworkController.search(searchTerm);
      const blogPosts = await BlogController.search(searchTerm);
      res.json({ artists, artworks, blogPosts });
  } catch (error) {
      console.error('Error searching:', error);
      res.status(500).json({ message: 'Error searching' });
  }
});

module.exports = router;
