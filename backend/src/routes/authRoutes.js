const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/initiate', authController.initiateAuth);
router.post('/verify-otp', authController.verifyOTP);
router.post('/complete-profile', authController.completeProfile);

// Protected route example
router.get('/dashboard', auth, (req, res) => {
  res.json({ message: 'Welcome to dashboard' });
});

// Protected routes
router.get('/verify-auth', auth, (req, res) => {
  res.status(200).json({ message: 'Token is valid' });
});

// Get user's children
router.get('/user/children', auth, authController.getUserChildren);

module.exports = router;