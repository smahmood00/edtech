const User = require('../models/User');
const Child = require('../models/Child');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

const getParentDashboardData = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get user's own enrollments with course details
    const userEnrollments = await Enrollment.find({
      studentId: userId,
      studentType: 'User'
    }).populate({
      path: 'courseId',
      select: 'name description price totalClasses totalHours toolUsed'
    });

    // Get user with their children
    const user = await User.findById(userId).populate({
      path: 'children',
      select: 'firstName lastName age'
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get enrollments for each child
    const childrenEnrollments = [];
    if (user.children && user.children.length > 0) {
      for (const child of user.children) {
        const enrollments = await Enrollment.find({
          studentId: child._id,
          studentType: 'Child'
        }).populate({
          path: 'courseId',
          select: 'name description price totalClasses totalHours toolUsed'
        });

        childrenEnrollments.push({
          child: {
            _id: child._id,
            firstName: child.firstName,
            lastName: child.lastName,
            age: child.age
          },
          enrollments: enrollments.map(enrollment => ({
            _id: enrollment._id,
            course: {
              _id: enrollment.courseId._id,
              name: enrollment.courseId.name,
              description: enrollment.courseId.description,
              totalClasses: enrollment.courseId.totalClasses,
              totalHours: enrollment.courseId.totalHours,
              toolUsed: enrollment.courseId.toolUsed,
              price: enrollment.courseId.price
            },
            enrollmentDate: enrollment.enrollmentDate,
            status: enrollment.status,
            progress: enrollment.progress || 0
          }))
        });
      }
    }

    // Return combined dashboard data
    res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        },
        userEnrollments: userEnrollments.map(enrollment => ({
          _id: enrollment._id,
          course: {
            _id: enrollment.courseId._id,
            name: enrollment.courseId.name,
            description: enrollment.courseId.description,
            totalClasses: enrollment.courseId.totalClasses,
            totalHours: enrollment.courseId.totalHours,
            toolUsed: enrollment.courseId.toolUsed,
            price: enrollment.courseId.price
          },
          enrollmentDate: enrollment.enrollmentDate,
          status: enrollment.status,
          progress: enrollment.progress || 0
        })),
        childrenEnrollments
      }
    });
  } catch (error) {
    console.error('Error in getParentDashboardData:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard data',
      error: error.message
    });
  }
};

module.exports = {
  getParentDashboardData
}; 