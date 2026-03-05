// server/routes/entrepreneurRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllEntrepreneurs,
  addEntrepreneur
} = require('../controllers/entrepreneurController');

router.get('/', getAllEntrepreneurs);
router.post('/', addEntrepreneur);

module.exports = router;
