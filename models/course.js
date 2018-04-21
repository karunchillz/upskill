/* Module Dependency */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Course Schema */
const CourseSchema = new Schema({
  name: {type: String, default: '', trim: true, index: true},
  institution: {type: String, default: '', trim: true},
  platform: {type: String, default: '', trim: true},
  url: {type: String, default: '', trim: true},
  classification: {type: String, default: '', trim: true, index: true},
  tags: {type: [], index: true},
  startDate: {type: Schema.Types.Mixed},
  duration: {type: String, default: '', trim: true},
  effort: {type: String, default: '', trim: true},
  studentsInterested: {type: Number, default: 0},
  rating: {type: Number, default: 0},
  review: {type: Number, default: 0}
});

/* Expose the Schema */
module.exports = mongoose.model('course', CourseSchema);
