const Chat = require('../models/Chat');
const { generateChatResponse } = require('../config/gemini');

// @desc    Send message to chatbot
// @route   POST /api/chatbot/send
// @access  Public
const sendMessage = async (req, res) => {
  try {
    const { message, userId = 'anonymous' } = req.body;

    console.log('📨 Chatbot request received:', { message, userId });

    // Validation
    if (!message || message.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Message is required and cannot be empty'
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Message too long. Maximum 1000 characters allowed.'
      });
    }

    console.log('🤖 Calling generateChatResponse...');
    
    // Generate AI response
    const botResponse = await generateChatResponse(message);
    
    console.log('✅ Response generated:', botResponse.substring(0, 100) + '...');

    // Save conversation to database
    const chat = new Chat({
      userId,
      message: message.trim(),
      response: botResponse
    });

    await chat.save();
    console.log('💾 Chat saved to database');

    // Send success response
    res.status(200).json({
      success: true,
      response: botResponse,
      chatId: chat._id,
      timestamp: chat.timestamp
    });

  } catch (error) {
    console.error('❌ CHATBOT CONTROLLER ERROR:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    let statusCode = 500;
    let errorMessage = 'Failed to process message';

    if (error.message.includes('API_KEY_INVALID')) {
      statusCode = 503;
      errorMessage = 'Chat service configuration error - Please check API key';
    } else if (error.message.includes('QUOTA_EXCEEDED')) {
      statusCode = 503;
      errorMessage = 'Chat service temporarily unavailable';
    } else if (error.message.includes('Empty message')) {
      statusCode = 400;
      errorMessage = error.message;
    }

    res.status(statusCode).json({
      success: false,
      error: errorMessage
    });
  }
};

// @desc    Get chat history for user
// @route   GET /api/chatbot/history/:userId
// @access  Public
const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 20;

    console.log('📖 Fetching chat history for user:', userId);

    const chats = await Chat.find({ userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .select('message response timestamp')
      .lean();

    // Reverse to show oldest first
    const reversedChats = chats.reverse();

    res.status(200).json({
      success: true,
      chats: reversedChats,
      count: reversedChats.length
    });

  } catch (error) {
    console.error('❌ Get chat history error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch chat history'
    });
  }
};

// @desc    Get chatbot analytics (for admin)
// @route   GET /api/chatbot/analytics
// @access  Private/Admin
const getChatbotAnalytics = async (req, res) => {
  try {
    console.log('📊 Fetching chatbot analytics');

    // Total conversations
    const totalChats = await Chat.countDocuments();
    
    // Unique users
    const uniqueUsers = await Chat.distinct('userId');
    
    // Today's chats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todaysChats = await Chat.countDocuments({
      timestamp: { $gte: today }
    });

    // Most active users
    const mostActiveUsers = await Chat.aggregate([
      {
        $group: {
          _id: '$userId',
          messageCount: { $sum: 1 }
        }
      },
      { $sort: { messageCount: -1 } },
      { $limit: 10 }
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        totalChats,
        uniqueUsers: uniqueUsers.length,
        todaysChats,
        mostActiveUsers
      }
    });

  } catch (error) {
    console.error('❌ Analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch analytics'
    });
  }
};

// ✅ MAKE SURE ALL FUNCTIONS ARE EXPORTED
module.exports = {
  sendMessage,
  getChatHistory,
  getChatbotAnalytics
};