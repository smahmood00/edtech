const User = require('../models/User');
const Child = require('../models/Child');
const Enrollment = require('../models/Enrollment');

const saveEnrollmentData = async (req, res) => {
  try {
    const { userId, enrollmentData, courseId } = req.body;

    if (!userId || !enrollmentData || !courseId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (enrollmentData.type === 'myself') {
      // Update user with age
      await User.findByIdAndUpdate(userId, { 
        age: enrollmentData.age 
      });

      // Create enrollment record for user
      await Enrollment.create({
        studentId: userId,
        studentType: 'User',
        courseId: courseId,
        enrollmentDate: new Date(),
        status: 'active'
      });
    } else if (enrollmentData.type === 'child') {
      // Create new child record
      const child = await Child.create({
        firstName: enrollmentData.firstName,
        lastName: enrollmentData.lastName,
        age: enrollmentData.age,
        parent: userId
      });

      // Create enrollment record for child
      await Enrollment.create({
        studentId: child._id,
        studentType: 'Child',
        courseId: courseId,
        enrollmentDate: new Date(),
        status: 'active'
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