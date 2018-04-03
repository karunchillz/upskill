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
    CourseModel.create({name: 'Sample Course'}, function(err, course){
      if(err) {
          return res.status(500).json({
              message: 'Error getting course.'
          });
      }
      return res.json(course);
    });
  }
};
