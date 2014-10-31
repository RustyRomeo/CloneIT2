//***********************************************
// OUR SERVER - THE ONE AND ONLY
//***********************************************

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./app/scripts/routes/routes.js');
var db = require('./app/scripts/database.js');
var pw = require('./app/scripts/password.js');

var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
//app.use(express.session({secret: '1234567890QWERTY'}));
app.use(routes);


var server = app.listen(8888, function() {
console.log('Listening on port %d', server.address().port);
});

// Defining our static folder where express looks for static files
app.use(express.static(path.join(__dirname, 'app')));

module.exports = app;
