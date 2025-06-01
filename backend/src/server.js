const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/course.routes');
const paymentRoutes = require('./routes/paymentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const app = express();

// Handle raw body for Stripe webhooks
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));

// CORS configuration - must be before any routes
app.use(cors({
  origin: ['https://eveagleacademy.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Regular middleware
app.use(express.json());

// Test route to verify API is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'EdTech API is running' });
});