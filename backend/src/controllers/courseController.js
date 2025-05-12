const Course = require('../models/Course');

// Get all published courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select('courseId courseName title ageGroup totalClasses totalHours coverImage overviewDescription toolUsed keyLearningOutcomes price slug');
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses :', error);
    res.status(500).json({ message: 'Error fetching courses', error });
  }
};

// Get a single published course by slug
exports.getCourseBySlug = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, isPublished: true })
      .select('courseId courseName title ageGroup totalClasses totalHours coverImage overviewDescription toolUsed keyLearningOutcomes price lessons endProductShowcaseMedia slug');
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    res.json(course);
  } catch (error) {
    console.error(`Error fetching course with slug "${req.params.slug}" (controller):`, error);
    res.status(500).json({ message: 'Error fetching course', error });
  }
};