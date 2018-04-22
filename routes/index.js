var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator());
var courseController = require('../controllers/course.js');
var userController = require('../controllers/user.js');

// Index page
router.get('/', function(req, res, next) {
  courseController.findTopCourses(req, res, next);
});

// Login user
router.get('/login', function(req, res, next) {
  res.render('login', {page:'login'});
});

// Logout user
router.get('/logout', function(req, res, next) {
  userController.logout(req, res, next);
});

router.post('/login', function(req, res, next) {
  userController.login(req, res, next);
});

// Registration page.
router.get('/register', function(req, res, next) {
  res.render('register', {page:'register'});
});

router.post('/register', function(req, res, next) {
  userController.register(req, res, next);
});

// Populate database with data.
router.get('/populate', function(req, res, next) {
  courseController.populate(req, res, next);
});

// Get search results.
router.get('/search', function(req, res, next) {
  courseController.searchCourses(req, res, next);
});

module.exports = router;
