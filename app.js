//***********************************************
// OUR SERVER - THE ONE AND ONLY
//***********************************************

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var NedbStore = require('connect-nedb-session')(session);
var bodyParser = require('body-parser');

var routes = require('./app/scripts/server/routes.js');
var db = require('./app/scripts/server/database.js');
var pw = require('./app/scripts/server/password.js');

var app = express();

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
        secret: '890QWER3451267TY',
        resave: false,
        saveUninitialized: false,
        cookie: { path: '/'
                , httpOnly: true
                , maxAge: 365 * 24 * 3600 * 1000   // One year for example
                },
        store: new NedbStore({ filename: './app/data/sessionstore.db' })
    }));
app.use(routes);


var server = app.listen(8888, function() {
console.log('Listening on http://localhost:'+ server.address().port);
});

// Defining our static folder where express looks for static files
app.use(express.static(path.join(__dirname, 'app')));

module.exports = app;
