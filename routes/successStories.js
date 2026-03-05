const express = require('express');
const router = express.Router();
const { getAllStories } = require('../controllers/successStoriesController');

router.get('/', getAllStories);

module.exports = router;
