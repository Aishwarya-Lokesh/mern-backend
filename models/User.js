// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  accountType: {
    type: String,
    enum: ['Visitor', 'Entrepreneur'],
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  visitorType: {
    type: String,
    enum: ['Student', 'Investor', 'General Public'],
    default: null
  },
  businessName: String,
  website: String,
  industry: String,
  businessLocation: String,
  yearsInBusiness: Number,
  contactNumber: String,
  businessDescription: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
