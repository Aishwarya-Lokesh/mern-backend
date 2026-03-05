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
app.use(cors({
  origin: "https://69a988223d3c7c517138fca9--gleaming-kelpie-529489.netlify.app",
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
const aboutUsRoutes = require('./routes/aboutUsRoutes');
app.use('/api/council', aboutUsRoutes);

app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/query', require('./routes/queryRoutes'));
app.use('/api/entrepreneurs', require('./routes/entrepreneurRoutes'));

// ✅ ADD CHATBOT ROUTES HERE
app.use('/api/chatbot', require('./routes/chatbotRoutes'));

// Health check
app.get('/', (req, res) => res.send('🟢 MEF API is running...'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
