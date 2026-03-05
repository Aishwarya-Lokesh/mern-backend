const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const User = require('../models/User');

// @route   GET /api/user/profile
// @desc    Get logged in user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Optional: Update user profile
// @route   PUT /api/user/profile
// @desc    Update user name/email
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();
    res.json({ msg: 'Profile updated successfully', user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
