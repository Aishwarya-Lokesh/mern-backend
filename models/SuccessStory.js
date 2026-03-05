const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema({
  name: String,
  photo: String,
  shortStory: String,
  fullStory: String
});

module.exports = mongoose.model('SuccessStory', successStorySchema);
