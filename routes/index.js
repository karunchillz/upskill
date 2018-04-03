var express = require('express');
var router = express.Router();
var courseController = require('../controllers/course.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/test', function(req, res, next) {
  courseController.populate(req, res, next);
});

module.exports = router;
