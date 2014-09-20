var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./app/routes/routes');

var db = require('./app/data/database.js');

var app = express();
//var router = express.Router();


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());


app.get('/posts', function (req, res) {
    db.getallposts(function( allPosts ) {
        if(allPosts) {
	        console.log('Res from DB: ');
	        console.log(allPosts);
            res.send(allPosts);
        }
    });
});


// POST to add new post
app.post('/addpost', function(req, res) {
	console.log(req.body);
	db.addpost(req.body);
//	res.json(newPost);
});

// POST to update upvotes
app.post('/upvote', function(req, res) {
	console.log(req.body);
	postId = req.body;
	db.upvote(postId);
	res.send('Hello Upvoter, you safely arrived on the other side and made it all the way back');
});

// POST to update downvotes
app.post('/downvote', function(req, res) {
	console.log(req.body);
	postId = req.body;
	db.downvote(postId);
});

// POST to update comments
app.post('/newcomment', function(req, res) {
	// TODO: what is passed with req? How to find out? I need the post Id & newComment here
	db.addcomment(postId, newComment);
});

// DELETE to delete post
app.delete('/remove', function(req, res) {
//	console.log(req);
	postId = req.body;
//	console.log('Req BODY: ');
//	console.log(req.body);
	db.deletepost(postId);
});



// Comes from a tutorial, not sure if needed here or if at the right place here
app.set('port', process.env.PORT || 8000);

var server = app.listen(8888, function() {
console.log('Listening on port %d', server.address().port);
});

// Defining our static folder where express looks for static files
app.use(express.static(path.join(__dirname, 'app')));

module.exports = app;





//app.use('/', routes);
//// Not yet needed
//app.use('/users', users);

// Make our db accessible to our router
//app.use(function(req,res,next){
//    req.db = db;
//    next();
//});
