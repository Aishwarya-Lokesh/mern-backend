// scripts/seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('🟢 Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  await connectDB();

  const existing = await User.findOne({ email: 'abc@123.gmail.com' });
  if (existing) {
    console.log('⚠️ Admin already exists. Skipping.');
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = new User({
    accountType: 'Admin',
    fullName: 'Super Admin',
    email: 'abc@123.gmail.com',
    password: hashedPassword,
    isAdmin: true,
    isVerified: true
  });

  await admin.save();
  console.log('✅ Admin user created');
  process.exit();
};

seedAdmin();
