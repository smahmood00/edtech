const express = require('express');
// const Course = require('../models/Course'); // Removed: Logic moved to controller
const courseController = require('../controllers/courseController'); // Added

const router = express.Router();

// Get all courses
router.get('/', courseController.getAllCourses); // Updated

// Get a single course by slug
router.get('/:slug', courseController.getCourseBySlug); // Updated

module.exports = router;