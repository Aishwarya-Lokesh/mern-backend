const express = require('express');
const {
  sendMessage,
  getChatHistory,
  getChatbotAnalytics
} = require('../controllers/chatbotController');

const router = express.Router();

// @route   POST /api/chatbot/send
// @desc    Send message to chatbot
// @access  Public
router.post('/send', sendMessage);

// @route   GET /api/chatbot/history/:userId
// @desc    Get chat history for user
// @access  Public
router.get('/history/:userId', getChatHistory);

// @route   GET /api/chatbot/analytics
// @desc    Get chatbot analytics
// @access  Private/Admin
router.get('/analytics', getChatbotAnalytics);

module.exports = router;