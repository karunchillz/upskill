//This javascript runs to check whether a particular course exists or no
var fs = require("fs");
var path = require('path');
var CourseModel = require('../models/course.js');
var HelperUtil = require('../util/helper.js');
// to Respond that something went wrong
module.exports = {
  findTopCourses: function(req, res, next){
    CourseModel.find({}, function(err, courses){
      if(err || !Array.isArray(courses) || !courses.length) {
        res.render('error', {page:'error', error: 'Oops! Sorry, something went wrong and I could not load the top courses. Please try again!'});        
      }else{
        res.render('index', { page:'home', courseList: courses });
      }
    }).sort({'rating': -1}).limit(9);
  },
//to Respond that the particular course searched is not present
  search: function(req, res, next){
    var searchTerm = req.body.term;
    const criteria = {tags:{$in:searchTerm.split(' ')}};
    CourseModel.find(criteria, function(err, courses){
      if(err || !Array.isArray(courses) || !courses.length) { 
          res.render('error', {page:'error', error: 'Oops! You got me. I dont know anything about '+searchTerm+'. Would you like to search for something else?'});
      }else{
        var resultObject = HelperUtil.analyzeResults(courses);
        var updatedCourses = resultObject['Courses'];
        delete resultObject['Courses'];
        res.render('search', { page:'search', term: searchTerm, filterObject: resultObject, courseList:  updatedCourses});
      }
    }).sort({'rating': -1});
  },
//Additional classification is not recognizable
  searchWithClassification: function(req, res, next){
    var classification = req.query.term;
    const criteria = {classification: classification};
    CourseModel.find(criteria, function(err, courses){
      if(err || !Array.isArray(courses) || !courses.length) {
        res.render('error', {page:'error', error: 'Oops! I am stumped. I cannot recognize the subject area '+classification+'. Would you like to search for something else?'});
      }else{
        var resultObject = HelperUtil.analyzeResults(courses);
        var updatedCourses = resultObject['Courses'];
        delete resultObject['Courses'];
        res.render('search', { page:'search', specialSearch: true, term: classification, filterObject: resultObject, courseList:  updatedCourses});
      }
    }).sort({'rating': -1});
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
