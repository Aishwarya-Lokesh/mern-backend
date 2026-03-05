const SuccessStory = require('../models/SuccessStory');

exports.getAllStories = async (req, res) => {
  try {
    const stories = await SuccessStory.find();
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
};
