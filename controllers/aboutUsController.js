const CouncilMember = require('../models/CouncilMember');

// GET all council members
exports.getCouncilMembers = async (req, res) => {
  try {
    const data = await CouncilMember.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new member (optional, for inserting)
exports.addCouncilMember = async (req, res) => {
  try {
    const newMember = new CouncilMember(req.body);
    const saved = await newMember.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
