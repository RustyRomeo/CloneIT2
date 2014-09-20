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

