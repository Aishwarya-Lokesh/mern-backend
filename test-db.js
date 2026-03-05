const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db');
const User = require('./models/User');

(async () => {
  await connectDB();

  const users = await User.find();
  console.log("👤 Users in DB:", users);

  process.exit();
})();
