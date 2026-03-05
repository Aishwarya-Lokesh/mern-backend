const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'ENTREPRENUERDATA' // ✅ EXACT database name in your MongoDB Atlas
    });

    console.log('✅ MongoDB Connected to ENTREPRENUERDATA');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
