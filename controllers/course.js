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
    var courseData = [{
      name: 'Machine Learning',
      institution: 'Stanford University',
      platform: 'Coursera',
      url: 'https://www.coursera.org/learn/machine-learning',
      classification: 'Computer Science',
      studentsInterested: 26.7,
      rating: 5,
      review: 327,
      effort: '5-7 hours a week',
      duration: '11 weeks long',
      startDate: new Date('Mon Apr 16 2018 00:00:00 GMT-0500 (CDT)'),
      selfPaced: false,
      withCertificate: false,
      cost: 0,
      tags: ['machine', 'learning', 'machine learning']
    },{
      name: 'CS50\'s Introduction to Computer',
      institution: 'Harvard University',
      platform: 'edX',
      url: 'https://www.edx.org/course/cs50s-introduction-computer-science-harvardx-cs50x',
      classification: 'Computer Science',
      studentsInterested: 15.7,
      rating: 4,
      review: 68,
      selfPaced: true,
      withCertificate: true,
      cost: 0,
      tags: ['computer', 'introduction', 'computer science', 'introduction to computer']      
    },{
      name: 'What is Mind?',
      institution: 'University of Cape Town',
      platform: 'FutureLearn',
      url: 'https://www.futurelearn.com/courses/what-is-a-mind',
      classification: 'Health',
      studentsInterested: 9.4,
      rating: 5,
      review: 113,
      effort: '3 hours a week',
      duration: '6 weeks long',
      startDate: new Date('Mon May 28 2018 00:00:00 GMT-0500 (CDT)'),
      selfPaced: false,
      withCertificate: true,
      cost: 0,
      tags: ['mind', 'mind working', 'what is mind']
    },{
      name: 'Moralities of Everyday Life',
      institution: 'Yale University',
      platform: 'Coursera',
      url: 'https://www.coursera.org/learn/moralities',
      classification: 'Health',
      studentsInterested: 10.8,
      rating: 5,
      review: 37,
      effort: '6-14 hours a week',
      duration: '6 weeks long',
      startDate: new Date('Mon Apr 23 2018 00:00:00 GMT-0500 (CDT)'),
      selfPaced: false,
      withCertificate: true,
      cost: 0,
      tags: ['moralities', 'life', 'moralities of everyday life']      
    },{
      name: 'Bitcoin and Cryptocurrency',
      institution: 'Princeton University',
      platform: 'Coursera',
      url: 'https://www.coursera.org/learn/cryptocurrency',
      classification: 'Business',
      studentsInterested: 5.5,
      rating: 5,
      review: 227,
      effort: '3-6 hours a week',
      duration: '11 weeks long',
      startDate: new Date('Mon Apr 16 2018 00:00:00 GMT-0500 (CDT)'),
      selfPaced: false,
      withCertificate: false,
      cost: 0,
      tags: ['bitcoin', 'cryptocurrency', 'bitcoin and cryptocurrency']      
    },{
      name: 'Marketing in a Digital World',
      institution: 'University of Illinois at Urbana Champaign',
      platform: 'Coursera',
      url: 'https://www.coursera.org/learn/marketing-digital',
      classification: 'Health',
      studentsInterested: 18.2,
      rating: 4,
      review: 162,
      effort: '6-8 hours a week',
      duration: '4 weeks long',
      startDate: new Date('Wed May 2 2018 00:00:00 GMT-0500 (CDT)'),
      selfPaced: false,
      withCertificate: true,
      cost: 0,
      tags: ['marketing', 'digital', 'marketing in a digital world']      
    }];
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
