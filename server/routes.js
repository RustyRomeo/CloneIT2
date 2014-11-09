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

        // Check if autologin shall take place
        if (req.body.session === req.session.id){
            db.getuser(req.session.name, function(dbanswer){
                if (dbanswer.username) {
                    console.log('Docs: ', dbanswer.username);
                    res.send(dbanswer, 200);

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
		res.send('logout successful', 200);
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

        var postId = req.body._id;
        var userId = req.body.userId;

        // Check if user is allowed to upvote
        permission.checkUpvoting(postId, userId, function (callback){
            if(callback === 'permission-ok'){
                db.upvote(postId);
		        db.upvotebyuser(postId, userId);
                res.send('upvote-ok', 200);
            }
            else if(callback === 'permission-denied'){
                res.send('no-permission', 200);
            }
            else{
                res.send('permission-check-error', 400);
            }
        });
	});

	app.post('/remove-upvote', function (req, res) {

        var postId = req.body._id;
        var userId = req.body.userId;

        permission.checkUpvoteRemoval(postId, userId, function (callback){
            if(callback === 'permission-ok'){
                db.removeupvote(postId);
		        db.removeupvotebyuser(postId, userId);
                res.send('remove-upvote-ok', 200);
            }
            else if(callback === 'permission-denied'){
                res.send('no-permission', 200);
            }
            else{
                res.send('permission-check-error', 400);
            }
        });
	});

	app.post('/downvote', function (req, res) {

        var postId = req.body._id;
        var userId = req.body.userId;

        permission.checkDownvoting(postId, userId, function (callback){
            if(callback === 'permission-ok'){
                db.downvote(postId);
                db.downvotebyuser(postId, userId);
                res.send('downvote-ok', 200);
            }
            else if(callback === 'permission-denied'){
                res.send('no-permission', 200);
            }
            else{
                res.send('permission-check-error', 400);
            }
        });
	});

	app.post('/remove-downvote', function (req, res) {

        var postId = req.body._id;
        var userId = req.body.userId;

        permission.checkDownvoteRemoval(postId, userId, function (callback){
            if(callback === 'permission-ok'){
                db.removedownvote(postId);
                db.removedownvotebyuser(postId, userId);
                res.send('remove-downvote-ok', 200);
            }
            else if(callback === 'permission-denied'){
                res.send('no-permission', 200);
            }
            else{
                res.send('permission-check-error', 400);
            }
        });
	});

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
		db.createuser(newUser, function (dbanswer){
			if (dbanswer === 'already-taken') {
				console.log('already-taken!');
				res.send('already-taken', 200);
			}else if(dbanswer[0] === 'user-added-successfully'){
				console.log('user-added-successfully!');
				res.send(dbanswer, 200);
			}else{
				console.log(response);
				res.send(dbanswer, 200);
			}
		})
	});

	// POST to delete post
	app.post('/remove', function (req, res) {

        var postId = req.body._id;
        var userId = req.body.userId;

        permission.checkDeletion(postId, userId, function (callback){
            if(callback === 'permission-ok'){
                db.deletepost(postId);
                res.send('permission-ok', 200);
            }
            else if(callback === 'permission-denied'){
                res.send('no-permission', 200);
            }
            else{
                res.send('permission-check-error', 400);
            }
        });
	});
