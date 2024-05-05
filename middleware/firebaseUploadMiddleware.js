const multer = require('multer');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { firebaseConfig } = require("../config/firebaseConfig");

// Initialize Firebase application
const app = initializeApp(firebaseConfig);

// Initialize storage for Multer
const storage = multer.memoryStorage();

const modelStoragePaths = {
  artwork: 'artworks',
  artist: 'artists',
  blog: 'blogposts',
}

// Initialize Firebase storage
const firebaseStorage = (modelType) => (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const storagePath = modelStoragePaths[modelType] || 'unknown';
  const storageRef = ref(getStorage(app), `${storagePath}/${req.file.originalname}`);

  const uploadTask = uploadBytesResumable(storageRef, req.file.buffer);

  uploadTask.on('state_changed', (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  }, (error) => {
    console.error('Error uploading file to Firebase storage:', error);
    res.status(500).send('Error uploading file to Firebase storage');
  }, () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      req.file.downloadURL = downloadURL;
      req.body.file = req.file.downloadURL;
      next();
    });
  });
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

module.exports = { upload, firebaseStorage };
