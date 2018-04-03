var CourseModel = require('../Models/course.js');

module.exports = {
  findTopCourses: function(req, res, next){
    const criteria = {};//{classification: classification || 'Business'};
    CourseModel.find(criteria, function(err, courses){
      if(err) {
          return res.status(500).json({
              message: 'Error getting course.'+err
          });
      }
      res.render('index', { courseList: courses });
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
      review: 327
    },{
      name: 'CS50\'s Introduction to Computer',
      institution: 'Harvard University',
      platform: 'edX',
      url: 'https://www.edx.org/course/cs50s-introduction-computer-science-harvardx-cs50x',
      classification: 'Computer Science',
      studentsInterested: 15.7,
      rating: 4,
      review: 68
    },{
      name: 'What is Mind?',
      institution: 'University of Cape Town',
      platform: 'FutureLearn',
      url: 'https://www.futurelearn.com/courses/what-is-a-mind',
      classification: 'Health',
      studentsInterested: 9.4,
      rating: 5,
      review: 113
    },{
      name: 'Moralities of Everyday Life',
      institution: 'Yale University',
      platform: 'Coursera',
      url: 'https://www.coursera.org/learn/moralities',
      classification: 'Health',
      studentsInterested: 10.8,
      rating: 5,
      review: 37
    },{
      name: 'Bitcoin and Cryptocurrency',
      institution: 'Princeton University',
      platform: 'Coursera',
      url: 'https://www.coursera.org/learn/cryptocurrency',
      classification: 'Business',
      studentsInterested: 5.5,
      rating: 5,
      review: 227
    },{
      name: 'Marketing in a Digital World',
      institution: 'University of Illinois at Urbana Champaign',
      platform: 'Coursera',
      url: 'https://www.coursera.org/learn/marketing-digital',
      classification: 'Health',
      studentsInterested: 18.2,
      rating: 4,
      review: 162
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
