//***********************************************
// OUR DATABASE
//***********************************************

var Datastore = require('nedb');

db = {};
db.posts = new Datastore({ filename: 'app/data/posts.db', autoload: true });
db.users = new Datastore({ filename: 'app/data/users.db', autoload: true });


db.getallposts = function ( callback ){ // Übergabe eines callbacks von ausserhalb
    db.posts.find({}, function (err, allPosts) {
        if(err){
            console.log('An error occurred while fetching all the posts in the database: ' + err);
        }else {
            var allPostsJson = JSON.stringify(allPosts);
            callback(allPostsJson); // Aufruf dieses callbacks
        }
    });
};


db.addpost = function (post){
	db.posts.insert(post, function (err, newPost){
		if(err){
			console.log('An error happened while trying to add a new post: ' + err);
		}else {
			console.log('Adding the new post was successful: ');
			console.log(newPost);
		}
	})
};


db.deletepost = function (postId){
	console.log('postId in the DB: ');
	console.log(postId);

	db.posts.remove( {_id:postId } , {}, function(err, numRemoved){
		if(err){
			console.log('An error happened while trying to delete a post: ' + err);
		}else if(numRemoved = 0) {
			console.log('No posts found in DB to be deleted!');
		}else {
			console.log('Deletion successful (number of posts deleted: ' + numRemoved + ')') ;
		}
	});
};


db.upvote = function (postId){
	var upvote = db.posts.find(postId, function (err, foundPosts) {
		if(err){
			console.log('There was following error when trying to upvote a post: ' + err);
		}else {
			var newUpvote = foundPosts[0].upvotes + 1;

			// Finding the object to upvote by postId and set the new upvote value to newUpvote
			db.posts.update(postId, { $set: { "upvotes": newUpvote }}, function (err, numReplaced) {
				if (err) {
					console.log(err);
				}else{
					console.log('Upvoting successful (number of upvoted posts: ' + numReplaced + ')');
				}
			});
		}
	});
};


db.downvote = function (postId){
	var downvote = db.posts.find(postId, function (err, foundPosts) {
	    if(err){
			console.log('There was following error when trying to downvote a post: ' + err);
		}else {
			var newDownvote = foundPosts[0].downvotes + 1;
			db.posts.update(postId, { $set: { "downvotes": newDownvote }}, function (err, numReplaced) {
				if (err) {
					console.log(err);
				}else{
					console.log('Downvoting successful (number of downvoted posts: ' + numReplaced + ')');
				}
			});
		}
	});
};


db.addcomment = function (postId, newComment){
	// $push inserts new elements at the end of the comments array
	db.posts.update({ id: postId }, { $push: { comments: newComment } }, {}, function (err, numReplaced) {
		if (err){
			console.log(err);
		}else {
			console.log(numReplaced);
		}
	});
};


db.checklogin = function ( login, password, callback ){
	console.log('login: ', login);
	console.log('password: ', password);
	console.log('callback: ', callback);
    db.users.findOne({username: login}, function (err, docs) {
        if(err){
            callback('error');
        }else if(docs === null) {
	        callback('not-found');
        }else{
	        if(password === docs.password){
		        console.log('Password verified!');
		        callback(docs);

	        }else {
		        console.log('Password not verified!');
		        callback('wrong')
	        }
        }
    });
};

db.createuser = function (newuser, callback){
	db.users.find({username:newuser.username}, function (err, docs){
		console.log('Docs: ', docs);
		console.log('Docs Length: ', docs.length);
		if(docs.length > 0){
			callback(['already-taken',''])
		}else
		{
			db.users.insert(newuser, function (err, newuser){
				if(err){
					console.log('An error happened while trying to add a new post: ' + err);
					callback('An error happened while trying to add a new post: ' + err);
				}else {
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

//// User creation machine
//var doc = {
//	username: 'oldy',
//	password: 'xxx',
//	firstname: 'John',
//	lastname: 'Hopkins',
//	image: 'images/oldmen4.png',
//	createdOn: new Date()
//};
//
//db.users.insert(doc, function (err, newDoc) {
//});