const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const paymentController = require('../controllers/paymentController');

// Create a checkout session
router.post('/create-checkout-session', auth, paymentController.createCheckoutSession);

// Handle Stripe webhook
router.post('/webhook', express.raw({type: 'application/json'}), paymentController.handleWebhook);

// Get payment history for a user
router.get('/history', auth, paymentController.getPaymentHistory);

module.exports = router; 