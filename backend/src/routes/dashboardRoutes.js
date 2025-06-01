const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getParentDashboardData } = require('../controllers/dashboardController');

// Debug route to test access
router.get('/test', (req, res) => {
  res.json({ message: 'Dashboard routes are accessible' });
});

// Protected dashboard routes
router.get('/parent', auth, (req, res, next) => {
  console.log('Accessing parent dashboard route');
  console.log('User from token:', req.user);
  next();
}, getParentDashboardData);

module.exports = router; 