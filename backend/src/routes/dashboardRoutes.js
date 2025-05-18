const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getParentDashboardData } = require('../controllers/dashboardController');

// Protected dashboard routes
router.get('/parent', auth, getParentDashboardData);

module.exports = router; 