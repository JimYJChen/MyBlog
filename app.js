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
const config = require('./config/config');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

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


app.use(session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    },
    store: new mongoStore({// 将 session 存储到 mongodb
        url: config.mongodb// mongodb 地址
    })
}));

app.use(flash());

app.locals.blog = {
    title: pkg.name,
    description: pkg.description
};

app.use(function (req, res, next) {
    res.locals.user = req.session.user
    res.locals.success = req.flash('success').toString()
    res.locals.error = req.flash('error').toString()
    next()
})

rounters(app); //set up the Router

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
