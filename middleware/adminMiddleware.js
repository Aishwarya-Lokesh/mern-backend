const User = require('../models/User');

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied: Admins only' });
    }
    next();
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = isAdmin;