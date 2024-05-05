const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const isAdmin = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

router.get('/admin/profile/:_id', isAdmin, (req, res) => {
  res.send('Welcome, admin!');
});

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong.');
});

module.exports = router;