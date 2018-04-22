// Module dependencies
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

// MongoDB connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://dbuser:dbpwd@ds229549.mlab.com:29549/upskill');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Express setup
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handle sessions
app.use(cookieParser());
app.use(session({secret:'secret', saveUninitialized: true, resave: true}));
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

// Router location
var indexRouter = require('./routes/index');
app.use('/', indexRouter);

/* Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Handle 404 error
app.use(function(req, res, next) {
  next(createError(404));
});
*/

module.exports = app;
