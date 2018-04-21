var UserModel = require('../models/user.js');
var bcrypt = require('bcryptjs');

module.exports = {
  register: function(req, res, next){
    console.log('inside register');
    console.log(req);
    // Extract Input
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var verify = req.body.verify; 
    console.log(name+'-'+email+'-'+password+'-'+verify);
    // Form Validator 
    req.checkBody('name', 'Name field is required!').notEmpty();
    req.checkBody('email', 'email field is required!').notEmpty();
    req.checkBody('email', 'email field is required!').isEmail();
    req.checkBody('password', 'Passwprd is required!').notEmpty();
    req.checkBody('verify', 'passwords do not match').equals(password);
    var errors = req.validationErrors();
    if(errors){
      console.log('inside error');
      console.log(errors);
      res.render('register', {
        errors: errors
      });
    }else{
      console.log('inside error else');
      var newUser = new User({
        name: name,
        email: email,
        password: password
      })
      console.log(newUser);
      UserModel.save(newUser, function(err, user){
        if(err) {throw err; console.log(err);};
        console.log(user)
      });
      req.flash('success','Congrats You are registerd :)');
      res.location('/');
      res.redirect('/');
    }
  },

  login: function(req, res, next){
    console.log('inside login');
    console.log(req);    
    var email = req.body.email;
    var password = req.body.password;  
    console.log(email+'-'+password);  
    var criteria = {email: email};
    CourseModel.findOne(criteria, function(err, user){
      if(err) {
        console.log('inside error - '+err);
        res.render('login', {
          errors: 'Username does not exist'
        });
      }else{
        console.log('inside error else');
        var pass = user.password;
        if(password != pass){
          console.log('inside password not match');
          res.render('login', {
            errors: 'Username/Passwprd does not match'
          });
        }   
        req.flash('success','Congrats You are registerd :)');
        res.location('/');
        res.redirect('/');        
      }
    });
  }  
};
