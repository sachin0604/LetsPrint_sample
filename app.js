var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var bodyParser = require('body-parser');
global.Promise = require('promise');


var FUNCTIONS = require('./util/function/function');
// stores logging information
var LOGS = require('./util/logsetup');

// provides token validation functionality for API Calls
//var AUTHCHECK = require('./util/security/authchecker');
// ensures data integrity for the API request 
var HAWKSETUP = require('./util/security/hawksetup');
//session
var sessionOptions = {
  secret: 'secret',
  rolling: true,
  resave: true,
  cookie: {
    maxAge: 365 * 24 * 60 * 60 * 1000
  }, //365 Days
  saveUninitialized: false
}

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bank = require('./routes/backend/bank');
var bankPayee = require('./routes/backend/bankPayee');
var bankAccount = require('./routes/backend/bankAccount');
var chqTemplate = require('./routes/backend/chqTemplate');
var manageChqBook = require('./routes/backend/manageChqBook');
var chequePrint = require('./routes/backend/chequePrint');
var reports = require('./routes/backend/reports');
var plan=require('./routes/backend/plan');
var userDetailsAndPlan=require('./routes/backend/userDetailsAndPlan');
var loginUser=require('./routes/backend/login');

//frontend
var bankRouter = require('./routes/frontend/index');
var loginUserFrontend=require('./routes/frontend/loginFrontend');


global.APP_BASE_PATH = __dirname;
//frontend

//constants
require('./util/constant');
require('./util/bankConstant/constant');
require('./util/function/function');
require('./util/function/frontEndFunctions');


var app = express();

/*To enable CORS BEGIN*/
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
});

app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');


// Set view engine as EJS
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');


app.use(logger('dev'));
//app.use(express.json());

app.use(bodyParser.json({
  limit: '100mb',
}));


app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false
  //parameterLimit:50000
}));


app.use(express.static(path.join(__dirname, 'public')));

// mapping custom middlewares start
//app.use(AUTHCHECK.authChecker);
//app.use(HAWKSETUP.securityHandler);
// mapping custom middlewares end
// app.use(express.urlencoded({ 
//   extended: false
//  }));


app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bank', bank);
app.use('/payee', bankPayee);
app.use('/account', bankAccount);
app.use('/chq', chqTemplate);
app.use('/manageChq', manageChqBook);
app.use('/chequePrint', chequePrint);
app.use('/reports', reports);
app.use('/manageBank', bankRouter);
app.use('/plan',plan);
app.use('/userDetails',userDetailsAndPlan);
app.use('/login',loginUser);

app.use('/loginFrontend',loginUserFrontend)

// app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({
  extended: false
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {

  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404');
});
app.locals = {
  FRONTEND: {
    //BASE_URL: "http://166.62.117.189:8081/",
    BASE_URL: "http://192.168.1.18:7000/",
    FRONTEND_URL: "http://192.168.1.18:7000",
  }
}

module.exports = app;
