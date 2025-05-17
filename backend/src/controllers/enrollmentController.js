const User = require('../models/User');
const Child = require('../models/Child');
const Enrollment = require('../models/Enrollment');

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

const getEnrollments = async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // Find all enrollments where the student is either the user or their children
    const enrollments = await Enrollment.find({
      $or: [
        { studentId: userId, studentType: 'User' },
        { studentId: { $in: req.user.children || [] }, studentType: 'Child' }
      ]
    })
    .populate('courseId', 'courseName toolUsed totalClasses totalHours')
    .sort({ enrollmentDate: -1 });

    res.json({
      success: true,
      enrollments
    });
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollments',
      error: error.message
    });
  }
};

const getEnrollmentById = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const userId = req.user.userId;

    const enrollment = await Enrollment.findById(enrollmentId)
      .populate('courseId', 'courseName toolUsed totalClasses totalHours')
      .populate('studentId', 'firstName lastName age');

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Verify that the user has access to this enrollment
    if (enrollment.studentType === 'User' && enrollment.studentId._id.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to enrollment'
      });
    }

    res.json({
      success: true,
      enrollment
    });
  } catch (error) {
    console.error('Error fetching enrollment:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching enrollment',
      error: error.message
    });
  }
};

const updateEnrollmentStatus = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    if (!['active', 'completed', 'dropped'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'Enrollment not found'
      });
    }

    // Verify that the user has access to this enrollment
    if (enrollment.studentType === 'User' && enrollment.studentId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to enrollment'
      });
    }

    enrollment.status = status;
    await enrollment.save();

    res.json({
      success: true,
      enrollment
    });
  } catch (error) {
    console.error('Error updating enrollment status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating enrollment status',
      error: error.message
    });
  }
};

module.exports = {
  saveEnrollmentData,
  getEnrollments,
  getEnrollmentById,
  updateEnrollmentStatus
};