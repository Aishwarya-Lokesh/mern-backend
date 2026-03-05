const ContactInfo = require('../models/ContactInfo');

const getContactInfo = async (req, res) => {
  try {
    const info = await ContactInfo.findOne(); // returns the first contact info
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getContactInfo };
