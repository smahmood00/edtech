const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  }
});

/**
 * Send a confirmation email for successful payment
 * @param {string} email - Recipient email address
 * @param {string} courseName - Name of the purchased course
 * @param {number} amount - Payment amount
 * @param {string} paymentId - Payment ID for reference
 * @returns {Promise} - Nodemailer info object
 */
exports.sendPaymentConfirmation = async (email, courseName, amount, paymentId) => {
  try {
    console.log('Sending payment confirmation email...');
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: `Payment Confirmation for ${courseName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #4F46E5; text-align: center;">Payment Successful!</h2>
          
          <p>Dear Student,</p>
          
          <p>Thank you for your payment. We're excited to confirm your enrollment in <strong>${courseName}</strong>.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Payment Details:</h3>
            <p><strong>Course:</strong> ${courseName}</p>
            <p><strong>Amount:</strong> HKD ${amount.toFixed(2)}</p>
            <p><strong>Payment ID:</strong> ${paymentId}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p>You will receive additional information about scheduling your course sessions shortly.</p>
          
          <p>If you have any questions, please don't hesitate to contact our support team.</p>
          
          <p style="margin-top: 30px;">Best regards,<br>EdTech Team</p>
        </div>
      `
    });
    
    console.log('Payment confirmation email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    throw error;
  }
};

/**
 * Send a general email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Plain text body
 * @param {string} html - HTML body (optional)
 * @returns {Promise} - Nodemailer info object
 */
exports.sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to,
      subject,
      text,
      html: html || undefined
    });
    
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}; 