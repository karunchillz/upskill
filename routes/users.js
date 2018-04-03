var expressValidator = require('express-validator');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');

var User = require('../Models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', {title:'Register'});
});

router.get('/login', function(req, res, next) {
  res.render('login', {title:'Login'});
});

router.post('/login',
  passport.authenticate('local',{failureRedirect:'/users/login', failureflash: 'Invalid Username or Password'}),
  function(req, res) {
	req.flash('success','You are now logged in:)');
	res.redirect('/');
 });

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(function(inputEmail, inputPassword, done){
	User.getUserByEmail(inputEmail, function(err, user){
		if(err) throw err;
		if(!user){
			return done(null, false, {message: 'Unknown User'});
		}
		User.comparePassword(inputPassword, user.inputPassword, function(err, isMatch){
			if(err) return done(err);
			if(isMatch){
				return done(null,user);
			} else {
				return done(null, false, {message:'Invalid Password :('});
			}
		});
	});
}));



router.post('/register', function(req, res, next) {
	
	var inputName = req.body.inputName;
	var inputEmail = req.body.inputEmail;
	var inputPassword = req.body.inputPassword;
	var inputVerify = req.body.inputVerify;
	
	// Check Errors
	


//form Validator 

	req.checkBody('inputName', 'Name field is required!').notEmpty();
	req.checkBody('inputEmail', 'email field is required!').notEmpty();
	req.checkBody('inputEmail', 'email field is required!').isEmail();
	req.checkBody('inputPassword', 'Passwprd is required!').notEmpty();
	req.checkBody('inputVerify', 'passwords do not match').equals(req.body.inputPassword);

	var errors = req.validationErrors();

 
	if(errors){
		res.render('register', {
			errors: errors
		});
	}
	else{
		var newUser = new User({
			inputName: inputName,
			inputEmail: inputEmail,
			inputPassword: inputPassword
		})

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user)
		});

		req.flash('success','Congrats You are registerd :)');
		res.location('/');
		res.redirect('/');
	}

});

  
module.exports = router; 

