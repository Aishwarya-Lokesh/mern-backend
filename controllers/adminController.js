const User = require('../models/User');
const { sendApprovalEmail } = require('../utils/emailService');

exports.getPendingEntrepreneurs = async (req, res) => {
  try {
    const pending = await User.find({ accountType: 'Entrepreneur', isVerified: false });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.isVerified = true;
    await user.save();

    await sendApprovalEmail(user.email, user.fullName);
    res.json({ msg: 'User verified and email sent' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
