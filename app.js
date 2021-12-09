const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");


const indexRouter = require('./routes/index');
const dashboardRouter = require('./components/dashboard');
const usersRouter = require('./routes/users');
const productRouter = require('./components/products');
const authRouter = require('./components/auth');
const adminRouter = require('./components/admin');
const accountRouter = require('./components/account');
const loggedInUserGuard = require('./middlewares/loggedInUserGuard')
const passport = require('./passport');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
})

app.use('/', indexRouter);
app.use('/admin', authRouter);
app.use('/users', usersRouter);
app.use('/account', loggedInUserGuard, accountRouter);
app.use('/dashboard', loggedInUserGuard, dashboardRouter);
app.use('/items-list', loggedInUserGuard, productRouter);
app.use('/admin-list',  adminRouter);

//app.use('/item-editor', productRouter);

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

// Register partials
//hbs.registerPartials(__dirname + '/views/partials')
