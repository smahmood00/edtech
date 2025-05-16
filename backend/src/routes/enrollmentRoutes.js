const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Save enrollment data after successful payment
router.post('/save', authMiddleware, enrollmentController.saveEnrollmentData);

module.exports = router;