var express = require('express');
var router = express.Router();
var courseController = require('../controllers/course.js');

/* Home page. */
router.get('/', function(req, res, next) {
  courseController.findTopCourses(req, res, next);
});

/* Login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {title:'Login'});
});

/* Registration page. */
router.get('/register', function(req, res, next) {
  res.render('register', {title:'Register'});
});

/* Populate database with data. */
router.get('/populate', function(req, res, next) {
  courseController.populate(req, res, next);
});

/* Get search results. */
router.get('/search', function(req, res, next) {
  courseController.searchCourses(req, res, next);
});

module.exports = router;
