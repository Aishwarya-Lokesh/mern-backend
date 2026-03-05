const mongoose = require('mongoose');

const CouncilMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  image: String,
  linkedin: String,
  bio: String
}, { collection: 'councilmembers' }); // ✅ exact name in MongoDB

module.exports = mongoose.model('CouncilMember', CouncilMemberSchema);
