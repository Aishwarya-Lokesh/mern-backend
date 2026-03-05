const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Entrepreneur dashboard visibility
    if (user.accountType === 'Entrepreneur' && !user.isVerified) {
      return res.status(403).json({ msg: 'Your account is pending verification by admin.' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};