var fs = require("fs");
var path = require('path');
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
    }).sort({'rating': -1}).limit(6);
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
    }).sort({'rating': -1}).limit(10);
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
    var jsonPath = path.join(__dirname, '..', 'data', 'course.json');
    var courseData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    var filteredCourseData = new Array();
    courseData.forEach(function(course){
      if(typeof(course.tags) === 'string'){
        course.tags = course.tags.split('[')[1].split(']')[0].split(' ');
      }
      if(typeof(course.studentsInterested) === 'string'){
        course.studentsInterested = parseInt(course.studentsInterested);
      }      
      filteredCourseData.push(course);
    });
    var wordsMap = {};
    var classificationMap = {};
    filteredCourseData.forEach(function(course){
      course.tags.forEach(function(tag){
        if(wordsMap.hasOwnProperty(tag)){
          wordsMap[tag]++;
        }else{
          wordsMap[tag]=1;
        }
      });
      if(classificationMap.hasOwnProperty(course.classification)){
        classificationMap[course.classification]++;
      }else{
        classificationMap[course.classification]=1;
      }
    });
    console.log(wordsMap);
    console.log(classificationMap);
    CourseModel.remove({},  function(err, course){
      if(err) {
          return res.status(500).json({
              message: 'Error deleting courses.'+err
          });
      }
    });
    CourseModel.insertMany(filteredCourseData, function(err, course){
      if(err) {
          return res.status(500).json({
              message: 'Error getting course.'+err
          });
      }
      return res.json(course);
    });
  }
};
