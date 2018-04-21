var UserModel = require('../models/user.js');
var bcrypt = require('bcryptjs');

module.exports = {
  register: function(req, res, next){
    // Extract Input
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var verify = req.body.verify; 
    // Form Validator 
    req.checkBody('name', 'Name field is required!').notEmpty();
    req.checkBody('email', 'email field is required!').notEmpty();
    req.checkBody('email', 'email field is required!').isEmail();
    req.checkBody('password', 'Passwprd is required!').notEmpty();
    req.checkBody('verify', 'passwords do not match').equals(password);
    var errors = req.validationErrors();
    if(errors){
      res.render('register', {
        errors: errors
      });
    }else{
      var newUser = new User({
        name: name,
        email: email,
        password: password
      })
      UserModel.save(newUser, function(err, user){
        if(err) throw err;
        console.log(user)
      });
      req.flash('success','Congrats You are registerd :)');
      res.location('/');
      res.redirect('/');
    }
  },

  login: function(req, res, next){
    var email = req.body.email;
    var password = req.body.password;    
    var criteria = {email: email};
    CourseModel.findOne(criteria, function(err, user){
      if(err) {
        res.render('login', {
          errors: 'Username does not exist'
        });
      }else{
        var pass = user.password;
        if(password != pass){
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
