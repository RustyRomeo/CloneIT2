//***********************************************
// OUR DATABASE
//***********************************************

var Datastore = require('nedb');

db = {};
db.posts = new Datastore({ filename: 'server/data/posts.db', autoload: true });
db.users = new Datastore({ filename: 'server/data/users.db', autoload: true });

db.getallposts = function ( callback ){
    db.posts.find({}, function (err, allPosts) {
        if (err) {
            console.log('An error occurred while fetching all the posts in the database: ' + err);
        }

        else {
            var allPostsJson = JSON.stringify(allPosts);
            callback(allPostsJson);
        }
    });
};

db.addpost = function (post, callback){
	db.posts.insert(post, function (err, newPost){
		if (err) {
			console.log('An error happened while trying to add a new post: ' + err);
		}

        else {
			console.log('Adding the new post was successful: ');
			console.log(newPost);
			var newPostId = {_id: newPost._id, newPost:'true'};
			console.log('newPostId: ', newPostId);
			callback(newPostId);
		}
	})
};

db.postbyuser = function (postId, userId){
			db.users.update({ _id: userId }, { $push: { posts: postId } }, {}, function (err, numReplaced) {
				if (err) {
					console.log(err);
				}

                else {
					console.log('Post on user successful (number of updated users: ' + numReplaced + ')');
				}
			});
		};

db.deletepost = function (postId){

	db.posts.remove( {_id: postId } , {}, function(err, numRemoved){
		if (err) {
			console.log('An error happened while trying to delete a post: ' + err);
		}

        else if (numRemoved = 0) {
			console.log('No posts found in DB to be deleted!');
		}

        else {
			console.log('Deletion successful (number of posts deleted: ' + numRemoved + ')') ;
		}
	});
};

db.upvote = function (postId){
	var upvote = db.posts.find({_id: postId}, function (err, foundPosts) {
		if (err) {
			console.log('There was following error when trying to upvote a post: ' + err);
		}

        else {
			var newUpvoteCount = foundPosts[0].upvotes + 1;

			// Finding the object to upvote by postId and set the new upvote value to newUpvote
			db.posts.update({_id: postId}, { $set: { "upvotes": newUpvoteCount }}, function (err, numReplaced) {
				if (err) {
					console.log(err);
				}

                else{
					console.log('Upvoting successful (number of upvoted posts: ' + numReplaced + ')');
				}
			});
		}
	});
};

db.removeupvote = function (postId){
	var upvote = db.posts.find({_id: postId}, function (err, foundPosts) {
		if (err) {
			console.log('There was following error when trying to remove an upvote: ' + err);
		}

        else {
			var newUpvoteCount = foundPosts[0].upvotes - 1;

			// Finding the object to upvote by postId and set the new upvote value to newUpvote
			db.posts.update({_id: postId}, { $set: { "upvotes": newUpvoteCount }}, function (err, numReplaced) {
				if (err) {
					console.log(err);
				}

                else {
					console.log('Removing upvote was successful (number of upvoted posts: ' + numReplaced + ')');
				}
			});
		}
	});
};

db.upvotebyuser = function (postId, userId){
    db.users.update({ _id: userId }, { $push: { upvotes: postId } }, {}, function (err, numReplaced) {
        if (err) {
            console.log(err);
        }

        else {
            console.log('Upvote on user successful (number of updated users: ' + numReplaced + ')');
        }
    });
};

db.removeupvotebyuser = function (postId, userId){
    db.users.update({ _id: userId }, { $pull: { upvotes: postId } }, {}, function (err, numReplaced) {
        if (err) {
            console.log(err);
        }

        else {
            console.log('Removing upvote on user successful (number of updated users: ' + numReplaced + ')');
        }
    });
};


db.downvote = function (postId){
	var downvote = db.posts.find({_id: postId}, function (err, foundPosts) {
	    if (err) {
			console.log('There was following error when trying to downvote a post: ' + err);
		}

        else {
			var newDownvote = foundPosts[0].downvotes + 1;
			db.posts.update({_id: postId}, { $set: { "downvotes": newDownvote }}, function (err, numReplaced) {
				if (err) {
					console.log(err);
				}

                else{
					console.log('Downvoting successful (number of downvoted posts: ' + numReplaced + ')');
				}
			});
		}
	});
};

db.removedownvote = function (postId){
	var downvote = db.posts.find({_id: postId}, function (err, foundPosts) {
	    if (err) {
			console.log('There was following error when trying to remove a downvote: ' + err);
		}

        else {
			var newDownvote = foundPosts[0].downvotes -1;
			db.posts.update({_id: postId}, { $set: { "downvotes": newDownvote }}, function (err, numReplaced) {
				if (err) {
					console.log(err);
				}

                else {
					console.log('Removing of downvote was successful (number of downvoted posts: ' + numReplaced + ')');
				}
			});
		}
	});
};

db.downvotebyuser = function (postId, userId){
    db.users.update({ _id: userId }, { $push: { downvotes: postId } }, {}, function (err, numReplaced) {
        if (err) {
            console.log(err);
        }

        else {
            console.log('Downvote on user successful (number of updated users: ' + numReplaced + ')');
        }
    });
};

db.removedownvotebyuser = function (postId, userId){
    db.users.update({ _id: userId }, { $pull: { downvotes: postId } }, {}, function (err, numReplaced) {
        if (err) {
            console.log(err);
        }

        else {
            console.log('Removing downvote on user successful (number of updated users: ' + numReplaced + ')');
        }
    });
};

db.addcomment = function (postId, newComment){

	// $push inserts new elements at the end of the comments array
	db.posts.update({_id: postId }, { $push: { comments: newComment } }, {}, function (err, numReplaced) {
		if (err) {
			console.log(err);
		}

        else {
			db.posts.find({ _id: postId }, function (err, docs) {
				if(err){
					console.log(err);
				}

				else {
					console.log('Docs: ',docs);
			        var newNumberComments = docs[0].commented +1;
					db.posts.update({_id: postId}, {$set: {commented: newNumberComments}}, function (err, numReplaced){
						if (err) {
							console.log(err);
						}

						else {
							console.log('Number of comments was increased to: ', + newNumberComments);
						}
					})
				}
			});
			console.log('Number of comments added: ', numReplaced);
		}
	});
};

db.checklogin = function ( login, password, callback ){
	console.log('login: ', login);
	console.log('password: ', password);

    db.users.findOne({username: login}, function (err, docs) {
        if (err) {
            callback('error');
        }

        else if (docs === null) {
	        callback('not-found');
        }

        else {
            var passwordIsCorrect = pw.verifyHash(password, docs.password);
	        if (passwordIsCorrect) {
		        console.log('Password verified!');
		        callback(docs);
	        }

            else {
		        console.log('Password not verified!');
		        callback('wrong')
	        }
        }
    });
};

db.getuser = function ( username, callback ){
	console.log('User Name: ', username);

    db.users.findOne({username: username}, function (err, docs) {
        if (err) {
            callback('error');
        }

        else if (docs === null) {
	        callback('not-found');
        }

        else {
		        callback(docs);
        }
    })
};

db.createuser = function (newuser, callback){
	db.users.find({username:newuser.username}, function (err, docs){
		console.log('Docs: ', docs);
		console.log('Docs Length: ', docs.length);
		if (docs.length > 0) {
			callback(['already-taken',''])
		}

        else {
            newuser.password = pw.generateHash(newuser.password);
			db.users.insert(newuser, function (err, newuser){
				if (err) {
					console.log('An error happened while trying to add a new post: ' + err);
					callback('An error happened while trying to add a new post: ' + err);
				}

                else {
					console.log('Adding the new user was successful: ');
					console.log(newuser);
					callback(['user-added-successfully', newuser]);
			    }
	        })
		}
	});
};


// Need to load each database (here we do it asynchronously)
db.posts.loadDatabase();
db.users.loadDatabase();


module.exports = db;
