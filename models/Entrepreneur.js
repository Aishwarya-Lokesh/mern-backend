// server/models/Entrepreneur.js
const mongoose = require('mongoose');

const entrepreneurSchema = new mongoose.Schema({
  name: String,
  business: String,
  sector: String,
  email: String,
  phone: String,
  address: String
}, { timestamps: true });

module.exports = mongoose.model('Entrepreneur', entrepreneurSchema);
