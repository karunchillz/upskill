var UserModel = require('../models/user.js');

module.exports = {
  register: function(req, res, next){
    console.log('inside register');
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
      res.render('register', { errors: errors });
    }else{
      console.log('inside error else');
      var newUser = {
        name: name,
        email: email,
        password: password
      };
      console.log(newUser);
      UserModel.create(newUser, function(err, user){
        if(err) {
          console.log(err);
          throw err;
        };
        console.log(user)
      });
      console.log(req.session);
      req.session.user = newUser.name;
      res.redirect('/');
    }
  },

  login: function(req, res, next){
    console.log('inside login'); 
    var email = req.body.email;
    var password = req.body.password;  
    console.log(email+'-'+password);  
    var criteria = {email: email};
    UserModel.findOne(criteria, function(err, user){
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
        console.log(req.session); 
        req.session.user = user.name;
        res.redirect('/');        
      }
    });
  }  
};
