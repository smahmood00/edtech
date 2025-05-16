const User = require('../models/User');
const Child = require('../models/Child');

const saveEnrollmentData = async (req, res) => {
  try {
    const { userId, enrollmentData } = req.body;

    if (!userId || !enrollmentData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (enrollmentData.type === 'myself') {
      // Update user with age
      await User.findByIdAndUpdate(userId, { 
        age: enrollmentData.age 
      });
    } else if (enrollmentData.type === 'child') {
      // Create new child record
      await Child.create({
        firstName: enrollmentData.firstName,
        lastName: enrollmentData.lastName,
        age: enrollmentData.age,
        parent: userId
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error saving enrollment data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  saveEnrollmentData
};