var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
router.use(expressValidator());
var userController = require('../controllers/user.js');

router.get('/register', function(req, res, next) {
  userController.register(req, res, next);
});

router.get('/login', function(req, res, next) {
  userController.login(req, res, next);
});
  
module.exports = router; 

