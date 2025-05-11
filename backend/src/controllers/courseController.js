const Course = require('../models/Course');

// Get all published courses
exports.getAllCourses = async (req, res) => {
  console.log('GET /api/courses - Fetching all courses (controller)');
  try {
    const courses = await Course.find({ isPublished: true })
      .select('courseId courseName title ageGroup totalClasses totalHours coverImage overviewDescription toolUsed keyLearningOutcomes price slug');
    console.log('Courses found:', courses.length);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses :', error);
    res.status(500).json({ message: 'Error fetching courses', error });
  }
};

// Get a single published course by slug
exports.getCourseBySlug = async (req, res) => {
  console.log(`GET /api/courses/${req.params.slug} - Fetching course by slug (controller)`);
  try {
    const course = await Course.findOne({ slug: req.params.slug, isPublished: true })
      .select('courseId courseName title ageGroup totalClasses totalHours coverImage overviewDescription toolUsed keyLearningOutcomes price lessons endProductShowcaseMedia slug');
    if (!course) {
      console.log(`Course with slug "${req.params.slug}" not found (controller).`);
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    console.log(`Course found (controller):`, course.courseName);
    res.json(course);
  } catch (error) {
    console.error(`Error fetching course with slug "${req.params.slug}" (controller):`, error);
    res.status(500).json({ message: 'Error fetching course', error });
  }
};