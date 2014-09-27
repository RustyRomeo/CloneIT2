//***********************************************
// ROUTES HANDLING
//***********************************************

var express = require('express');

// We want to be able to access this app also from other modules, so we assign it to module.exports
// --> see TJ Holowaychuck on this: http://vimeo.com/56166857
var app = module.exports = express();

	app.get('/posts', function (req, res) {
		db.getallposts(function (allPosts) {
			if (allPosts) {
				res.send(allPosts);
			}
		});
	});

	// Check login data
	app.get('/checklogin', function (req, res){
//		console.log(req);
		db.checklogin(function (req, loginTrue){
			if(loginTrue){
				console.log('Back from DB and found a User!');
//				console.log(loginTrue);
//				res.send(loginTrue);
			}
		})
	});

	// Check login data
	app.post('/checklogin', function(req, res){

//		// Logger
//		console.log('req.body: ', req.body);
//		console.log('req.login: ', req.body.login);
//		console.log('req.pw: ', req.body.password);

		db.checklogin(req.body.login, req.body.password, function(dbanswer){
			if (dbanswer === 'error'){
				res.send(400);
			}else if(dbanswer === 'not-found') {
				res.send('not-found', 200);
			}else if(dbanswer === 'correct') {
				res.send('correct', 200);
			}else if(dbanswer === 'wrong'){
				res.send('wrong', 200);
			}else {
				res.send('unknown-error', 400);
			}
		});
	});

	// POST to add new post
	app.post('/addpost', function (req, res) {
		db.addpost(req.body);
	});

	// POST to update upvotes
	app.post('/upvote', function (req, res) {
		postId = req.body;
		db.upvote(postId);
	});

	// POST to update downvotes
	app.post('/downvote', function (req, res) {
		postId = req.body;
		db.downvote(postId);
	});

	// POST to update comments
	app.post('/newcomment', function (req, res) {
		postId = req.body.id;
		newComment = req.body.newComment;
		db.addcomment(postId, newComment);
	});

	// DELETE to delete post
	app.delete('/remove/:postId', function (req, res) {
		postId = +req.params.postId;
		db.deletepost(postId);
	});

