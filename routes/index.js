var express = require('express');
var router = express.Router();
var courseController = require('../controllers/course.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  courseController.findTopCourses(req, res, next);
});

/* GET home page. */
router.get('/populate', function(req, res, next) {
  courseController.populate(req, res, next);
});

module.exports = router;
