var db = require('../data/database.js');

var express = require('express');
var router = express.Router();


// GET to retrieve all posts from database
router.get('/', function(req, res) {
	res.sendfile('../index.html', { title: 'CloneIT' });
	var allPosts = db.getallposts;
	res.send(allPosts);

//    // or maybe like this?
//	res.json(allPosts);

});

// POST to add new post
router.post('/addpost', function(req, res) {
	// TODO: what is passed with req? How to find out? I need the newPost here
	db.addpost(newPost);
});

// POST to update upvotes
router.post('/upvote', function(req, res) {
	// TODO: what is passed with req? How to find out? I need the postId here
	db.upvote(postId);
});

// POST to update downvotes
router.post('/downvote', function(req, res) {
	// TODO: what is passed with req? How to find out? I need the postId here
	db.downvote(postId);
});

// POST to update comments
router.post('/newcomment', function(req, res) {
	// TODO: what is passed with req? How to find out? I need the post Id & newComment here
	db.addcomment(postId, newComment);
});

// DELETE to delete post
router.delete('/remove', function(req, res) {
    // TODO: what is passed with req? How to find out? I need the post Id here
	db.deletepost(postId);
});

module.exports = router;