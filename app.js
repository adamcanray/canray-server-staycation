var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOveridde = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
// import mongoose
const mongoose= require('mongoose');
// connect to database
// mongoose.connect('mongodb://127.0.0.1:27017/db_staycation', {
mongoose.connect('mongodb+srv://adamcanray:bwamern@staycation-cluster.nwrre.mongodb.net/db_staycation?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// Router Admin
const adminRouter = require('./routes/admin');
// Route API's
const apiRouter = require('./routes/api');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// End view engine setup

// Addition
app.use(methodOveridde('_method'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    // secure: true,
    maxAge: 60000,
  }
}))
app.use(flash());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// End Addition
/* create new static file */
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));
/* End create new static file */

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter); // Admin
app.use('/api/v1/member', apiRouter); // API's
// End Routes


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
