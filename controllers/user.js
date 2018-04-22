var UserModel = require('../models/user.js');

module.exports = {
  register: function(req, res, next){
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var verify = req.body.verify;
    // Form Validator
    req.checkBody('name', 'Name is required!').notEmpty();
    req.checkBody('email', 'Email is required!').notEmpty();
    req.checkBody('email', 'Email format is incorrect!').isEmail();
    req.checkBody('password', 'Password is required!').notEmpty();
    req.checkBody('verify', 'Passwords do not match!').equals(password);
    var errors = req.validationErrors();
    if(errors){
      res.render('register', { page: 'register', errors: errors });
    }else{
      var newUser = { name: name, email: email, password: password };
      UserModel.create(newUser, function(err, user){
        if(err || user === null) {
          res.render('register', { page: 'register', message: 'User already exists! Kindly try with a different credential' });
        };
      });
      req.session.user = newUser.name;
      res.redirect('/');
    }
  },

  login: function(req, res, next){ 
    var email = req.body.email;
    var password = req.body.password;
    // Form Validator
    req.checkBody('email', 'Email is required!').notEmpty();
    req.checkBody('email', 'Email format is incorrect!').isEmail();
    req.checkBody('password', 'Password is required!').notEmpty();
    var errors = req.validationErrors();
    if(errors){
      res.render('login', { page: 'login', errors: errors });
    }else{
      var criteria = {email: email};
      UserModel.findOne(criteria, function(err, user){
        console.log(user);
        if(err || user == null) {
          res.render('login', { page: 'login', message: 'Username does not exist!' });
        }else{
          var pass = user.password;
          if(password != pass){
            res.render('login', { page: 'login', message: 'Username/Password does not match!' });         
          } 
          req.session.user = user.name;
          res.redirect('/');      
        }
      });
    }
  },

  logout: function(req, res, next){
     req.session.destroy(function(){
        res.render('login', { page: 'login', message: 'User successfully logged out!' }); 
     });   
   }
};
