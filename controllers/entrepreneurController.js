// server/controllers/entrepreneurController.js
const Entrepreneur = require('../models/Entrepreneur');

exports.getAllEntrepreneurs = async (req, res) => {
  try {
    const entrepreneurs = await Entrepreneur.find();
    res.json(entrepreneurs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addEntrepreneur = async (req, res) => {
  try {
    const newEntry = new Entrepreneur(req.body);
    const saved = await newEntry.save();
    res.json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
