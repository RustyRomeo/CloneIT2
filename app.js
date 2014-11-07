//***********************************************
// OUR SERVER - THE ONE AND ONLY
//***********************************************

var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var NedbStore = require('connect-nedb-session')(session);
var bodyParser = require('body-parser');

var routes = require('./server/routes.js');
var db = require('./server/database.js');
var pw = require('./server/password.js');

var app = express();

app.use(favicon());
//app.use(logger('dev'));
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
        store: new NedbStore({ filename: 'server/data/sessionstore.db' })
    }));
app.use(routes);

app.set('port', process.env.PORT || 8888);

var server = app.listen(app.get('port'), function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// Defining our static folder where express looks for static files
app.use(express.static(path.join(__dirname, 'app')));

module.exports = app;
