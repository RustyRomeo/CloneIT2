var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// database
//var mongo = require('mongoskin');
//var db = mongo.db("mongodb://localhost:27017/nodetest2", {native_parser:true});

var index = require('./app/routes/index');
var posts = require('./app/routes/posts');
var db = require('.app/data/database');

var app = express();

// view engine setup
app.set('index.html', path.join(__dirname, 'app')); // vorher anstatt 'index.html' -> 'views'

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

// make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', index); // before: routes now: index
app.use('/posts', posts);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;