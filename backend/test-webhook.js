require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function testWebhook() {
  try {
    console.log('Creating a test checkout session...');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'hkd',
            product_data: {
              name: 'Test Course',
              description: 'Test Course Description',
            },
            unit_amount: 1000, // $10.00
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:3000/payment/failure',
      customer_email: 'test@example.com',
    });
    
    console.log('Test session created:', session.id);
    console.log('Complete the payment in the Stripe dashboard to trigger a webhook event.');
    console.log('Stripe dashboard URL: https://dashboard.stripe.com/test/payments');
    
  } catch (error) {
    console.error('Error creating test session:', error);
  }
}

testWebhook(); 