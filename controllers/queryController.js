const Query = require('../models/Query');

const submitQuery = async (req, res) => {
  try {
    const query = await Query.create(req.body);
    res.status(201).json({ message: "Query received", query });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { submitQuery };
