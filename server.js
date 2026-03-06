const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to DB
connectDB();

// Init app
const app = express();

// Middlewares
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// ✅ CORS configuration for frontend (Netlify + local testing)
const allowedOrigins = [
  'https://69aae705a29525e188349aea--delightful-queijadas-6b2717.netlify.app'
  'https://delightful-queijadas-6b2717.netlify.app', // Netlify
  'http://localhost:3000' // Local frontend testing
];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/council', require('./routes/aboutUsRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/query', require('./routes/queryRoutes'));
app.use('/api/entrepreneurs', require('./routes/entrepreneurRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));

// Health check
app.get('/', (req, res) => res.send('🟢 MEF API is running...'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
