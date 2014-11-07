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

    app.post('/checklogin', function (req, res){
        console.log(req.session);
        // Check if autologin shall take place
        if (req.body.session === req.session.id){
            db.getuser(req.session.name, function(dbanswer){
                if (dbanswer.username) {
                    console.log('Docs: ', dbanswer.username);
                    console.log('req.body.remember: ', req.body.remember);
                    res.send(dbanswer, 200);

                }else if(dbanswer === 'wrong'){
                    res.send('wrong', 200);

                }else if(dbanswer === 'not-found') {
                    res.send('not-found', 200);

                }else if (dbanswer === 'error'){
                    res.send(400);

                }else {
                    res.send('unknown-error', 400);
                }
            });

        // Check for normal login
        }else if (req.body.login && req.body.password){
            console.log('Kein Autologin');
            db.checklogin(req.body.login, req.body.password, function(dbanswer){
			if (dbanswer.username) {
				console.log('Docs: ', dbanswer.username);
				console.log('req.body.remember: ', req.body.remember);
				if (req.body.remember == true ){

                    // Create Permanent Session
                    req.session.name = req.body.login;
                    res.cookie('session', req.session.id);
				    res.send(dbanswer, 200);

				}else {
                    req.session.name = req.body.login;
					res.clearCookie('session', { path: '/' });
					res.send(dbanswer, 200);
				}
			}else if(dbanswer === 'wrong'){
				res.send('wrong', 200);
			}else if(dbanswer === 'not-found') {
				res.send('not-found', 200);
			}else if (dbanswer === 'error'){
				res.send(400);
			}else {
				res.send('unknown-error', 400);
			}
		});
        }
    });

	app.post('/logout', function (req, res){
		res.clearCookie('session', { path: '/' });
        req.session.destroy();
		res.send('correct', 200);
		console.log('Cookies & Session cleared');
	});

	// POST to add new post
	app.post('/addpost', function (req, res) {
		db.addpost(req.body, function(newPostId){
			if(newPostId){
				console.log('newPostId in den Routes: ', newPostId);
				res.send(newPostId, 200);
			}
		});

		db.getallposts(function (allPosts) {
			if (allPosts) {
				res.send(allPosts, 200);
			}
		});
	});

	app.post('/post-by-user', function (req, res){
		postId = req.body.postId;
		userId = req.body.userId;
		db.postbyuser(postId, userId);
        res.send('ok', 200);
	} );

	// POST to update upvotes
	app.post('/upvote', function (req, res) {
		postId = req.body;
		db.upvote(postId);
        res.send('ok', 200);
	});

	app.post('/remove-upvote', function (req, res) {
		postId = req.body;
		db.removeupvote(postId);
        res.send('ok', 200);
	});

	app.post('/upvote-by-user', function (req, res){
		postId = req.body.postId;
		userId = req.body.userId;
		db.upvotebyuser(postId, userId);
        res.send('ok', 200);
	} );

	app.post('/remove-upvote-by-user', function (req, res){
		postId = req.body.postId;
		userId = req.body.userId;
		db.removeupvotebyuser(postId, userId);
        res.send('ok', 200);
	} );

	// POST to update downvotes
	app.post('/downvote', function (req, res) {
		postId = req.body;
		db.downvote(postId);
        res.send('ok', 200);
	});

	app.post('/remove-downvote', function (req, res) {
		postId = req.body;
		db.removedownvote(postId);
        res.send('ok', 200);
	});

	app.post('/downvote-by-user', function (req, res){
		postId = req.body.postId;
		userId = req.body.userId;
		db.downvotebyuser(postId, userId);
        res.send('ok', 200);
	} );

	app.post('/remove-downvote-by-user', function (req, res){
		postId = req.body.postId;
		userId = req.body.userId;
		db.removedownvotebyuser(postId, userId);
        res.send('ok', 200);
	} );

	// POST to update comments
	app.post('/newcomment', function (req, res) {
		postId = req.body._id;
		newComment = req.body.newComment;
		db.addcomment(postId, newComment);
        res.send('ok', 200);
	});

	app.post('/newuser', function (req, res) {
		console.log(req);
		console.log(req.body);
		var newUser = {};
		newUser.username = req.body.username;
		newUser.email = req.body.email;
		newUser.firstname = req.body.firstname;
		newUser.lastname = req.body.lastname;
		newUser.password = req.body.password;
		newUser.image = req.body.image;
		newUser.createdOn = req.body.createdOn;
		newUser.posts = [];
		newUser.upvotes = [];
		newUser.downvotes = [];

		console.log('newUser: ', newUser);
		db.createuser(newUser, function (response){
			if (response === 'already-taken') {
				console.log('already-taken!');
				res.send('already-taken', 200);
			}else if(response[0] === 'user-added-successfully'){
				console.log('user-added-successfully!');
				res.send(response, 200);
			}else{
				console.log(response);
				res.send(response, 200);
			}
		})
	});

	// POST to delete post
	app.post('/remove', function (req, res) {
		postId = req.body._id;
		db.deletepost(postId);
        res.send('ok', 200);
	});

