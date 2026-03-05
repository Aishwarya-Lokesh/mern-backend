const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// Only admin can access these routes
router.get('/users', auth, async (req, res) => {
  try {
    const requestingUser = await User.findById(req.user.id);
    if (!requestingUser || !requestingUser.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/verify/:id', auth, async (req, res) => {
  try {
    const requestingUser = await User.findById(req.user.id);
    if (!requestingUser.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, {
      isVerified: true
    }, { new: true });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error verifying user' });
  }
});

router.delete('/user/:id', auth, async (req, res) => {
  try {
    const requestingUser = await User.findById(req.user.id);
    if (!requestingUser.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
