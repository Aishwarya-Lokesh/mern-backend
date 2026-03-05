const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const {
    accountType,
    fullName,
    email,
    password,
    visitorType,
    businessName,
    website,
    industry,
    businessLocation,
    yearsInBusiness,
    contactNumber,
    businessDescription
  } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      accountType,
      fullName,
      email,
      password: hashedPassword,
      visitorType: accountType === 'Visitor' ? visitorType : null,
      businessName,
      website,
      industry,
      businessLocation,
      yearsInBusiness,
      contactNumber,
      businessDescription
    });

    await newUser.save();
    res.status(201).json({ msg: 'Registered successfully' });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ msg: error.message || "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};