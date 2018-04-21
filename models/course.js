/* Module Dependency */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Course Schema */
const CourseSchema = new Schema({
  name: {type: String, trim: true, index: true},
  institution: {type: String, trim: true},
  platform: {type: String, trim: true},
  url: {type: String, trim: true},
  classification: {type: String, trim: true, index: true},
  studentsInterested: {type: Number, default: 0},
  rating: {type: Number, default: 0},
  review: {type: Number, default: 0},
  effort: {type: String, trim: true},
  duration: {type: String, trim: true},
  startDate: {type: Date},
  selfPaced: {type: Boolean, default: false},
  withCertificate: {type: Boolean, default: false},
  cost: {type: Number, default: 0},
  tags: {type: [], index: true}
});

/* Expose the Schema */
module.exports = mongoose.model('course', CourseSchema);
