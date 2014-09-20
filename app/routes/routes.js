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
				console.log('Res from DB: ');
				console.log(allPosts);
				res.send(allPosts);
			}
		});
	});

	// POST to add new post
	app.post('/addpost', function (req, res) {
		console.log(req.body);
		db.addpost(req.body);
		//	res.json(newPost);
	});

	// POST to update upvotes
	app.post('/upvote', function (req, res) {
		console.log(req.body);
		postId = req.body;
		db.upvote(postId);
		res.send('Hello Upvoter, you safely arrived on the other side and made it all the way back');
	});

	// POST to update downvotes
	app.post('/downvote', function (req, res) {
		console.log(req.body);
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
		console.log(req.params.postId);
		postId = +req.params.postId;
		//	console.log(postId);
		db.deletepost(postId);
	});

