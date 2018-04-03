var CourseModel = require('../Models/course.js');

module.exports = {
  findTopCourses: function(req, res, next){
    var classification = req.params.classification;
    const criteria = '';//{classification: classification || 'Business'};
    CourseModel.find(criteria, function(err, courses){
      if(err) {
          return res.status(500).json({
              message: 'Error getting course.'
          });
      }
      return res.json(courses);
    });
  },

  populate: function(req, res, next){
    var courseData = {
      name: 'Machine Learning',
      institution: 'Stanford University',
      platform: 'Coursera',
      url: 'https://www.coursera.org/learn/machine-learning',
      classification: 'Computer Science',
      tags: ['machine', 'learning', 'computer', 'science'],
      studentsInterested: 26.7,
      rating: 5,
      review: 327
    });
    CourseModel.create(courseData, function(err, course){
      if(err) {
          return res.status(500).json({
              message: 'Error getting course.'
          });
      }
      return res.json(course);
    });
  }
};
