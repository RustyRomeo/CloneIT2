//***********************************************
// OUR DATABASE
//***********************************************

var Datastore = require('nedb');

db = {};
db.posts = new Datastore({ filename: 'app/data/posts.db', autoload: true });


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

	db.posts.remove( {id:postId } , {}, function(err, numRemoved){
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


// Need to load each database (here we do it asynchronously)
db.posts.loadDatabase();


module.exports = db;



//************************************************************************
//// Will be used only in future version for user management
//db.users = new Datastore({ filename: 'data/users.db', autoload: true });
//db.users.loadDatabase();
//************************************************************************
