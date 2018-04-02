var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var favicon = require('serve-favicon');
var bodyParcer = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressValidator = require('express-validator');
var flash = require('connect-flash'); 
var bcrypt = require('bcryptjs');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;





var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extened:true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);


//handle sessions
app.use(session({
    secret:'secret',
    saveUninitialized: true,
    resave: true
    
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
          , root = namespace.shift()
          , formParam = root;
        
        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }        
        return {
            param : formParam,
            msg: msg,
            value: value
        };
      }
    }));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://dbuser:dbpwd@ds229549.mlab.com:29549/upskill', function (err, db) {
  if (err) throw err;

  db.collection('account').find().toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});


module.exports = app;
