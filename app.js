'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
const pkg = require('./package');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const flash = require('connect-flash');
const config = require('config-lite')(__dirname);

//var routes = require('./routes/enterance');
//var users = require('./routes/users');
//var login = require('./routes/login');
//var regist = require('./routes/regist');

var rounters = require('./routes/mainRouter');

var app = express();

var blog = {
    "name":"Jim test bolg"
};

var port = 80;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};
app.locals.db = {
    dbPath: config.mongodb
};


//app.use('/', routes);
//app.get('/users', users);
//app.get('/login', login);
//app.get('/regist', regist);
rounters(app);
// catch 404 and forward to error handler
//app.use(function (req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

//// error handlers

// //development error handler
//// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function (err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('404', {
//            blog: blog
//        });
//    });
//}

// production error handler
// no stacktraces leaked to user
//app.use(function (err, req, res, next) {
//    res.status(err.status || 500);
//    res.render('404', {
//        message: err.message,
//        error: {}
//    });
//});

app.set(port, port);

//app.listen(port, function (post, hostname) {
//    console.log('Server have started ! port : ' + post + 'host name : ' + hostname);
//});
var server = app.listen(app.get(port), function () {
    console.log('Express server listening on port ' + server.address().port);
});
