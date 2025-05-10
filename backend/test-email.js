require('dotenv').config();
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

async function testEmail() {
  try {
    const info = await transporter.sendMail({
      from: 'sanjana.mahmood10@gmail.com',
      to: 'gaiamine.testing@gmail.com', // Replace with your test email
      subject: 'Test Email',
      text: 'This is a test email to verify nodemailer configuration'
    });
    
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

testEmail();