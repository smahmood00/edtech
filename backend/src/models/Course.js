const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  lessonNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  hours: { type: Number, required: true },
  outcomes: [{ type: String }]
});

const courseSchema = new mongoose.Schema({
  ageGroup: { type: String, required: true },
  courseName: { type: String, required: true },
  toolUsed: { type: String, required: true },
  totalClasses: { type: Number, required: true },
  totalHours: { type: Number, required: true },
  title: { type: String, required: true },
  overviewDescription: { type: String, required: true },
  coverImage: { type: String },
  overviewMedia: { type: String },
  lessons: [lessonSchema],
  keyLearningOutcomes: [{ type: String }],
  endProductShowcaseMedia: [{ type: String }],
  isPublished: { type: Boolean, default: false },
  slug: { type: String, unique: true }
});

// Pre-save hook to generate slug
courseSchema.pre('save', function(next) {
  if (this.isModified('courseName')) {
    this.slug = this.courseName.toLowerCase().replace(/ /g, '-');
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);