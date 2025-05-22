require('dotenv').config();
const User = require('../models/User');
const OTP = require('../models/OTP');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');



const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  }
});

const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

exports.initiateAuth = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    const otp = generateOTP();
    console.log("Email is : ", email);
    console.log("OTP is : ", otp);

    // Validate OTP format before hashing
    if (!/^\d{4}$/.test(otp)) {
      throw new Error('Invalid OTP format');
    }

    // Save OTP
    await OTP.create({
      email,
      otp: await bcrypt.hash(otp, 8)
    });
    console.log("OTP saved successfully");

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Authentication OTP',
      text: `Your OTP is: ${otp}`
    }).then(info => {
      console.log('Message sent: %s', info.messageId);
    }).catch(err => {
      console.error('Error sending email:', err);
      throw err;
    });

    res.status(200).json({ 
      message: 'OTP sent successfully',
      isExistingUser: await User.exists({ email })
    });
  } catch (error) {
    console.error('Error in initiateAuth:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });
    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP expired or not found' });
    }

    const isValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const user = await User.findOne({ email });
    const token = jwt.sign(
      { userId: user ? user._id : null, email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token,
      isExistingUser: !!user
    });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP' });
  }
};

exports.completeProfile = async (req, res) => {
  try {
    const { email, firstName, lastName, phoneNumber } = req.body;
    
    const user = await User.create({
      email,
      firstName,
      lastName,
      phoneNumber,
      isVerified: true
    });

    const token = jwt.sign(
      { userId: user._id, email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
};

exports.getUserChildren = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate('children');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.children || []);
  } catch (error) {
    console.error('Error fetching user\'s children:', error);
    res.status(500).json({ message: 'Error fetching children' });
  }
};