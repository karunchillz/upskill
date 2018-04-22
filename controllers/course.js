var fs = require("fs");
var CourseModel = require('../models/course.js');

module.exports = {
  findTopCourses: function(req, res, next){
    const criteria = {};//{classification: classification || 'Business'};
    CourseModel.find(criteria, function(err, courses){
      if(err) {
          return res.status(500).json({
              message: 'Error getting course.'+err
          });
      }
      res.render('index', { page:'home', courseList: courses });
    });
  },

  search: function(req, res, next){
    var searchTerm = req.body.term; 
    const criteria = {tags:{$in:searchTerm.split(' ')}};
    CourseModel.find(criteria, function(err, courses){
      if(err) {
          return res.status(500).json({
              message: 'Error getting course.'+err
          });
      }
      res.render('search', { page:'search', term: searchTerm, courseList: courses });
    });
  },

  searchCourses: function(req, res, next){
    const criteria = {tags:{$in:['machine', 'learning', 'mind', 'bitcoin']}};
    CourseModel.find(criteria, function(err, courses){
      if(err) {
          return res.status(500).json({
              message: 'Error getting course.'+err
          });
      }
      return res.json(courses);
    });
  },

  populate: function(req, res, next){
    var courseData = JSON.parse(fs.readFileSync(__dirname + '/data/sample.json', 'utf-8'));
    CourseModel.remove({},  function(err, course){
      if(err) {
          return res.status(500).json({
              message: 'Error deleting courses.'
          });
      }
    });
    CourseModel.insertMany(courseData, function(err, course){
      if(err) {
          return res.status(500).json({
              message: 'Error getting course.'
          });
      }
      return res.json(course);
    });
  }
};
