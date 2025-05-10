const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  console.log('GET /api/courses - Fetching all courses');
  try {
    const courses = await Course.find({ isPublished: true })
      .select('courseName title ageGroup totalClasses totalHours coverImage overviewDescription toolUsed keyLearningOutcomes');
    console.log('Courses found:', courses.length);
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses', error });
  }
});

// Get a single course by slug
router.get('/:slug', async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug, isPublished: true });
    if (!course) {
      res.status(404).json({ message: 'Course not found' });
      return;
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error });
  }
});

module.exports = router;