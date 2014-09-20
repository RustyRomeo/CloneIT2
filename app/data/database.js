var Datastore = require('nedb');

db = {};
db.posts = new Datastore({ filename: 'app/data/posts.db', autoload: true });

// Defining database methods
//db.getallposts = function (){
//	return db.posts.find({}, function (err, allPosts) {
//		if(err){
//			console.log('There was following error while fetching all the posts in the database: ' + err);
//		}else {
////			var allPostsJson = JSON.stringify(allPosts);
////			console.log('allPostsJson' + allPostsJson);
////			return allPostsJson;
//		}
//	});
//};

//db.getallposts = function ( callback ){ // Übergabe eines callbacks von ausserhalb
//    db.posts.find({}, function (err, allPosts) {
//        if(err){
//            console.log('There was following error while fetching all the posts in the database: ' + err);
//        }else {
//            var allPostsJson = JSON.stringify(allPosts);
//            callback(allPostsJson); //Aufruf dieses callbacks
//            console.log('allPostsJson' + allPostsJson);
//        }
//    });
//};

db.getallposts = function ( callback ){ // Übergabe eines callbacks von ausserhalb
    db.posts.find({}, function (err, allPosts) {
        if(err){
            console.log('There was following error while fetching all the posts in the database: ' + err);
        }else {
            var allPostsJson = JSON.stringify(allPosts);
            callback(allPostsJson); // Aufruf dieses callbacks
//            console.log('allPostsJson' + allPostsJson);
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
	console.log('PostID on the other Side: ');
	console.log(postId);
	db.posts.remove( postId , {}, function(err, numRemoved){
		if(err){
			console.log('An error happened while trying to delete a post: ' + err);
		}else {
			console.log('Deleting the desired post was successful: ' + numRemoved);}
	});
};

db.upvote = function (postId){
	var upvote = db.posts.find(postId, function (err, foundPosts) {
		if(err){
			console.log('There was following error while fetching the posts in the database: ' + err);
		}else {
			var newUpvote = foundPosts[0].upvotes + 1;

			// Finding the object to upvote by postId and set the new upvote value to newUpvote
			db.posts.update(postId, { $set: { "upvotes": newUpvote }}, function (err, numReplaced) {
				if (err) {
					console.log(err);
				}else{
					// Shows the number of replaced elements
					console.log('Number of replaced posts: ' + numReplaced);
				}
			});
		}
	});
};

db.downvote = function (postId){
	var downvote = db.posts.find(postId, function (err, foundPosts) {
	    if(err){
			console.log('There was following error while fetching the posts in the database: ' + err);
		}else {
			var newDownvote = foundPosts[0].downvotes + 1;

			// Finding the object to downvote by postId and set the new downvote value to newDownvote
			db.posts.update(postId, { $set: { "downvotes": newDownvote }}, function (err, numReplaced) {
				if (err) {
					console.log(err);
				}else{
					// Shows the number of replaced elements
					console.log('Number of replaced posts: ' + numReplaced);
				}
			});
		}
	});
};

db.addcomment = function (postId, newComment){
	// $push inserts new elements at the end of the array
	db.posts.update({ _id: postId }, { $push: { comments: newComment } }, {}, function () {
	});
};

// Need to load each database (here we do it asynchronously)
db.posts.loadDatabase();


//// Will be used only in future version
//db.users = new Datastore({ filename: 'data/users.db', autoload: true });
//db.users.loadDatabase();

module.exports = db;