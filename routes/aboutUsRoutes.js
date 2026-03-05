const express = require('express');
const router = express.Router();
const CouncilMember = require('../models/CouncilMember');

router.get('/', async (req, res) => {
  try {
    const members = await CouncilMember.find();
    res.json(members);
  } catch (error) {
    console.error('Error fetching council:', error.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
