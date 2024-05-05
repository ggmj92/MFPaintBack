const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const authMiddleware = require('../middleware/authMiddleware');

const isAuthenticated = (req, res, next) => {

  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

router.get('/user/:_id/home', isAuthenticated, (req, res) => {
  res.send(`Welcome, ${user.username}!`);
});

router.get('/', async (req, res) => {
  try {
    const listUsers = await admin.auth().listUsers();
    const users = listUsers.users.map(userRecord => userRecord.toJSON());
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { isAdmin } = req.body;

  try {
    await admin.auth().setCustomUserClaims(userId, { admin: isAdmin });
    res.status(200).send('User role updated successfully');
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

module.exports = router;