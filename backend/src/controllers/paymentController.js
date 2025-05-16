const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const Course = require('../models/Course');
const User = require('../models/User');
const mongoose = require('mongoose');
const emailService = require('../utils/emailService');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { courseName, price, userEmail, paymentMethod, successUrl, cancelUrl } = req.body;
    const userId = req.user.userId;
    console.log('User ID:', userId);

    console.log('Creating checkout session with:', { courseName, price, userEmail, paymentMethod });

    // Validate email is not empty
    if (!userEmail) {
      console.error('Email is missing from request');
      
      // Try to get user email from the database as a fallback
      try {
        const user = await User.findById(userId);
        if (user && user.email) {
          console.log('Using email from user account:', user.email);
          req.body.userEmail = user.email;  // Update the request body
        } else {
          return res.status(400).json({ message: 'Customer email is required for checkout' });
        }
      } catch (userErr) {
        console.error('Error fetching user email:', userErr);
        return res.status(400).json({ message: 'Customer email is required for checkout' });
      }
    }

    // Ensure we have a valid email by this point
    const customerEmail = req.body.userEmail;
    
    // Get course details
    const course = await Course.findOne({ courseName });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    console.log('Course found:', course._id);

    // First create the Stripe session
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'hkd',
              product_data: {
                name: courseName,
                description: `Enrollment for ${courseName}`,
              },
              unit_amount: Math.round(price * 100), // Convert to cents and ensure integer
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
        customer_email: customerEmail, // Use the validated email
        metadata: {
          userId: userId.toString(),
          courseId: course._id.toString()
        }
      });
      
      console.log('Stripe session created:', session.id);
    } catch (stripeError) {
      console.error('Stripe error:', stripeError);
      return res.status(500).json({ message: 'Error with payment processor', error: stripeError.message });
    }

    // Now create the payment record using direct MongoDB operation to bypass Mongoose validation
    try {
      const payment = await Payment.create({
        userId: new mongoose.Types.ObjectId(userId),
        courseId: course._id,
        amount: price,
        paymentMethod,
        status: 'pending',
        stripeSessionId: session.id // Include the session ID here
      });
      
      console.log('Payment saved with ID:', payment._id);
      
      // Update Stripe session with paymentId
      await stripe.checkout.sessions.update(session.id, {
        metadata: {
          ...session.metadata,
          paymentId: payment._id.toString()
        }
      });
      
      console.log('Session metadata updated with payment ID');
      
      return res.json({ id: session.id });
    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // If we can't create the payment record, cancel the session
      try {
        await stripe.checkout.sessions.expire(session.id);
        console.log('Session expired due to payment record creation failure');
      } catch (expireError) {
        console.error('Error expiring session:', expireError);
      }
      
      return res.status(500).json({ message: 'Error creating payment record', error: dbError.message });
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ message: 'Error creating checkout session', error: error.message });
  }
};

exports.handleWebhook = async (req, res) => {
  console.log('Webhook endpoint called');
  console.log('Headers:', JSON.stringify(req.headers));
  
  const sig = req.headers['stripe-signature'];
  if (!sig) {
    console.error('No Stripe signature found in request headers');
    return res.status(400).send('Webhook Error: No Stripe signature');
  }
  
  console.log('Request body type:', typeof req.body);
  console.log('Stripe-Signature:', sig);
  
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log('Webhook verified and constructed successfully');
    console.log('Event type:', event.type);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Checkout session completed:', session.id);
      
      try {
        // Update payment status
        const payment = await Payment.findOneAndUpdate(
          { stripeSessionId: session.id },
          { 
            status: 'completed',
            completedAt: new Date()
          },
          { new: true }
        ).populate('courseId');
        
        if (!payment) {
          console.error('Payment not found for session:', session.id);
          break;
        }
        
        console.log('Payment updated:', payment._id);
        
        // Get user email and course details
        const user = await User.findById(payment.userId);
        
        if (!user || !user.email) {
          console.error('User email not found for payment:', payment._id);
          break;
        }
        
        console.log('Sending confirmation email to user:', user.email);
        
        // Send confirmation email
        await emailService.sendPaymentConfirmation(
          user.email,
          payment.courseId.courseName,
          payment.amount,
          payment._id.toString()
        );
        
        console.log('Payment confirmation email sent to:', user.email);
      } catch (error) {
        console.error('Error processing payment completion:', error);
      }
      break;

    case 'checkout.session.expired':
      const expiredSession = event.data.object;
      console.log('Session expired:', expiredSession.id);
      
      const expiredPayment = await Payment.findOneAndUpdate(
        { stripeSessionId: expiredSession.id },
        { status: 'failed' },
        { new: true }
      );
      
      console.log('Payment marked as failed:', expiredPayment?._id || 'Not found');
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  console.log('Sending 200 response for webhook');
  res.json({ received: true });
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const payments = await Payment.find({ userId })
      .populate('courseId', 'courseName')
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ message: 'Error fetching payment history' });
  }
}; 