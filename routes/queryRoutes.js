const express = require('express');
const router = express.Router();
const { submitQuery } = require('../controllers/queryController');

router.post('/', submitQuery);

module.exports = router;
