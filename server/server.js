require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/postRoutes');
const communityRoutes = require('./routes/communities');
const conservationPlacesRoutes = require('./routes/conservationPlaces');
const helmet = require('helmet');

// Environment variables with defaults
const JWT_SECRET = process.env.JWT_SECRET || 'tree-planting-volunteer-secret-key-2024';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tree-planting-volunteer';
const PORT = process.env.PORT || 5000;

// Make JWT_SECRET available globally
process.env.JWT_SECRET = JWT_SECRET;

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Serve static files
app.use('/uploads', express.static('uploads'));
app.use('/images', express.static('public/images'));

// CSP with helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "http://localhost:5000", "data:", "blob:"],
      connectSrc: ["'self'", "http://localhost:5000"],
    },
  })
);

// Connect to MongoDB with retry logic
const connectWithRetry = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.log('Retrying connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/communities', communityRoutes);
app.use('/api/conservation-places', conservationPlacesRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB URI: ${MONGODB_URI}`);
});