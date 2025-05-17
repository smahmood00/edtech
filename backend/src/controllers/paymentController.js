const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const Course = require('../models/Course');
const User = require('../models/User');
const mongoose = require('mongoose');
const emailService = require('../utils/emailService');
const Child = require('../models/Child');

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
      console.log('\n=== Creating Stripe Checkout Session ===');
      console.log('Course:', courseName);
      console.log('User ID:', userId);
      console.log('Email:', customerEmail);

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
        success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: cancelUrl,
        customer_email: customerEmail,
        metadata: {
          userId: userId.toString(),
          courseId: course._id.toString(),
          enrollmentData: JSON.stringify(req.body.enrollmentData)
        }
      });
      
      console.log('\n=== Stripe Session Created ===');
      console.log('Session ID:', session.id);
      console.log('Payment Intent:', session.payment_intent);

      // Create the payment record
      const payment = await Payment.create({
        userId: new mongoose.Types.ObjectId(userId),
        courseId: course._id,
        amount: price,
        paymentMethod,
        status: 'pending',
        stripeSessionId: session.id
      });
      
      console.log('\n=== Payment Record Created ===');
      console.log('Payment ID:', payment._id);
      console.log('Stripe Session ID:', payment.stripeSessionId);

      // Update Stripe session with paymentId
      await stripe.checkout.sessions.update(session.id, {
        metadata: {
          ...session.metadata,
          paymentId: payment._id.toString()
        }
      });
      
      console.log('\n=== Session Metadata Updated ===');
      console.log('Updated metadata:', {
        ...session.metadata,
        paymentId: payment._id.toString()
      });
      
      return res.json({ id: session.id });
    } catch (error) {
      console.error('\n=== Error in Payment Flow ===');
      console.error('Error:', error);
      return res.status(500).json({ 
        message: 'Error in payment flow', 
        error: error.message,
        details: error.stack
      });
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ message: 'Error creating checkout session', error: error.message });
  }
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

exports.verifyPayment = async (req, res) => {
  try {
    const { session_id } = req.query;
    
    console.log('\n=== Verifying Payment ===');
    console.log('Session ID:', session_id);
    
    if (!session_id) {
      return res.status(400).json({ success: false, message: 'Session ID is required' });
    }

    // First check our database
    const payment = await Payment.findOne({ stripeSessionId: session_id }).populate('courseId');
    console.log('\n=== Database Payment Record ===');
    console.log('Payment found:', payment ? 'Yes' : 'No');
    if (payment) {
      console.log('Payment ID:', payment._id);
      console.log('Status:', payment.status);
    }

    // Retrieve the session from Stripe
    console.log('\n=== Retrieving Stripe Session ===');
    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log('Stripe Session Status:', session.payment_status);
    console.log('Stripe Session Metadata:', session.metadata);
    
    // Check if the payment was successful
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ success: false, message: 'Payment not completed' });
    }

    if (!payment) {
      console.log('\n=== Creating Missing Payment Record ===');
      // If payment record doesn't exist, create it
      const newPayment = await Payment.create({
        userId: new mongoose.Types.ObjectId(session.metadata.userId),
        courseId: new mongoose.Types.ObjectId(session.metadata.courseId),
        amount: session.amount_total / 100, // Convert from cents
        paymentMethod: 'credit', // Default to credit for Stripe
        status: 'completed',
        stripeSessionId: session_id,
        completedAt: new Date()
      });
      console.log('Created new payment record:', newPayment._id);
      
      // Get user for the new payment
      const user = await User.findById(session.metadata.userId);
      if (!user) {
        console.error('User not found for new payment');
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      try {
        // Add course to user's enrolled courses
        await User.findByIdAndUpdate(
          user._id,
          { $addToSet: { enrolledCourses: newPayment.courseId } }
        );
        console.log('Added course to user enrolled courses');

        // Process enrollment data
        const enrollmentData = JSON.parse(session.metadata.enrollmentData);
        console.log('\n=== Processing Enrollment Data ===');
        console.log('Enrollment Type:', enrollmentData.type);

        if (enrollmentData.type === 'myself') {
          // Update user with age
          await User.findByIdAndUpdate(user._id, { 
            age: enrollmentData.age 
          });
          console.log('Updated user age:', enrollmentData.age);
        } else if (enrollmentData.type === 'child') {
          // Create new child record
          const child = await Child.create({
            firstName: enrollmentData.firstName,
            lastName: enrollmentData.lastName,
            age: enrollmentData.age,
            parent: user._id
          });
          console.log('Created child record:', child._id);

          // Add child to user's children array
          await User.findByIdAndUpdate(
            user._id,
            { $addToSet: { children: child._id } }
          );
          console.log('Added child to user\'s children array');
        }

        // Send confirmation email
        console.log('\n=== Sending Confirmation Email ===');
        console.log('Email configuration:', {
          email: user.email,
          courseName: session.metadata.courseName || 'Course',
          amount: newPayment.amount
        });

        await emailService.sendPaymentConfirmation(
          user.email,
          session.metadata.courseName || 'Course',
          newPayment.amount,
          newPayment._id.toString()
        );
        console.log('Confirmation email sent successfully');
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Don't throw the error, just log it
      }

      return res.json({ success: true, payment: newPayment });
    }

    if (payment.status !== 'completed') {
      // Update payment status if not already completed
      payment.status = 'completed';
      payment.completedAt = new Date();
      await payment.save();
      console.log('Updated payment status to completed');

      // Get user and send confirmation email
      const user = await User.findById(payment.userId);
      if (!user) {
        console.error('User not found for existing payment');
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      try {
        // Add course to user's enrolled courses
        await User.findByIdAndUpdate(
          payment.userId,
          { $addToSet: { enrolledCourses: payment.courseId } }
        );
        console.log('Added course to user enrolled courses');

        // Process enrollment data
        const enrollmentData = JSON.parse(session.metadata.enrollmentData);
        console.log('\n=== Processing Enrollment Data ===');
        console.log('Enrollment Type:', enrollmentData.type);

        if (enrollmentData.type === 'myself') {
          // Update user with age
          await User.findByIdAndUpdate(user._id, { 
            age: enrollmentData.age 
          });
          console.log('Updated user age:', enrollmentData.age);
        } else if (enrollmentData.type === 'child') {
          // Create new child record
          const child = await Child.create({
            firstName: enrollmentData.firstName,
            lastName: enrollmentData.lastName,
            age: enrollmentData.age,
            parent: user._id
          });
          console.log('Created child record:', child._id);

          // Add child to user's children array
          await User.findByIdAndUpdate(
            user._id,
            { $addToSet: { children: child._id } }
          );
          console.log('Added child to user\'s children array');
        }

        // Send confirmation email
        console.log('\n=== Sending Confirmation Email ===');
        console.log('Email configuration:', {
          email: user.email,
          courseName: payment.courseId.courseName,
          amount: payment.amount
        });

        await emailService.sendPaymentConfirmation(
          user.email,
          payment.courseId.courseName,
          payment.amount,
          payment._id.toString()
        );
        console.log('Confirmation email sent successfully');
      } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Don't throw the error, just log it
      }
    }

    return res.json({ success: true, payment });
  } catch (error) {
    console.error('\n=== Error Verifying Payment ===');
    console.error('Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error verifying payment', 
      error: error.message,
      details: error.stack
    });
  }
};

exports.handleWebhook = async (req, res) => {
  console.log('\n=== Webhook Request Received ===');
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  
  const sig = req.headers['stripe-signature'];
  if (!sig) {
    console.error('No Stripe signature found in request headers');
    return res.status(400).send('Webhook Error: No Stripe signature');
  }
  
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log('\n=== Webhook Event Constructed ===');
    console.log('Event Type:', event.type);
    console.log('Event ID:', event.id);
  } catch (err) {
    console.error('\n=== Webhook Signature Verification Failed ===');
    console.error('Error:', err.message);
    console.error('Stripe-Signature header:', sig);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('\n=== Processing Completed Checkout Session ===');
      console.log('Session ID:', session.id);
      console.log('Customer Email:', session.customer_email);
      console.log('Payment Status:', session.payment_status);
      console.log('Session Metadata:', session.metadata);
      
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
        
        console.log('\n=== Payment Record Updated ===');
        console.log('Payment ID:', payment._id);
        console.log('Course:', payment.courseId.courseName);
        console.log('Amount:', payment.amount);
        
        // Get user and process enrollment
        const user = await User.findById(payment.userId);
        if (!user) {
          console.error('User not found for payment:', payment._id);
          break;
        }

        // Add course to user's enrolled courses
        await User.findByIdAndUpdate(
          payment.userId,
          { $addToSet: { enrolledCourses: payment.courseId } }
        );
        
        console.log('\n=== User Enrollment Updated ===');
        console.log('User ID:', user._id);
        console.log('Course Added:', payment.courseId._id);

        // Send payment confirmation email
        await emailService.sendPaymentConfirmation(
          user.email,
          payment.courseId.courseName,
          payment.amount,
          payment._id.toString()
        );
        
        console.log('\n=== Payment Confirmation Email Sent ===');
        console.log('Email sent to:', user.email);

        // Send webhook confirmation email
        await emailService.sendEmail(
          user.email,
          'Webhook Processed Successfully',
          `Your payment for ${payment.courseId.courseName} has been successfully processed by our webhook system.`,
          `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #4F46E5; text-align: center;">Webhook Processing Confirmation</h2>
            
            <p>Dear ${user.firstName || 'Student'},</p>
            
            <p>This is a technical confirmation that our webhook system has successfully processed your payment for <strong>${payment.courseId.courseName}</strong>.</p>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h3 style="margin-top: 0;">Processing Details:</h3>
              <p><strong>Event ID:</strong> ${event.id}</p>
              <p><strong>Event Type:</strong> ${event.type}</p>
              <p><strong>Processing Time:</strong> ${new Date().toISOString()}</p>
            </div>
            
            <p>Your enrollment has been confirmed and the course has been added to your account.</p>
            
            <p style="margin-top: 30px;">Best regards,<br>EdTech System</p>
          </div>
          `
        );
        
        console.log('\n=== Webhook Confirmation Email Sent ===');
        console.log('Email sent to:', user.email);
        
      } catch (error) {
        console.error('\n=== Error Processing Payment Completion ===');
        console.error('Error:', error);
      }
      break;

    case 'checkout.session.expired':
      const expiredSession = event.data.object;
      console.log('\n=== Processing Expired Session ===');
      console.log('Session ID:', expiredSession.id);
      
      const expiredPayment = await Payment.findOneAndUpdate(
        { stripeSessionId: expiredSession.id },
        { status: 'failed' },
        { new: true }
      );
      
      console.log('Payment marked as failed:', expiredPayment?._id || 'Not found');
      break;
      
    default:
      console.log(`\n=== Unhandled Event Type: ${event.type} ===`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
}; 