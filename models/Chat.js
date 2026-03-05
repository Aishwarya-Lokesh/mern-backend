const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    default: 'anonymous'
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  response: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create indexes for better performance
chatSchema.index({ userId: 1, timestamp: -1 });

module.exports = mongoose.model('Chat', chatSchema);