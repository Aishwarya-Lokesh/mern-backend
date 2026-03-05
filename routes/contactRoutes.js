const express = require('express');
const router = express.Router();
const ContactInfo = require('../models/ContactInfo');

// GET /api/contact
router.get('/', async (req, res) => {
  try {
    const info = await ContactInfo.findOne(); // ensure you're using findOne()
    res.json(info); // should return object, not array
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
