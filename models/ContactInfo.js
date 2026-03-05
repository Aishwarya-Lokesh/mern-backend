const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  email: String,
  phone: String,
  address: String,
  mapLink: String
});

module.exports = mongoose.model("ContactInfo", contactInfoSchema);
