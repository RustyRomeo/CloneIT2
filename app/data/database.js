var Datastore = require('nedb');

db = {};
db.posts = new Datastore({ filename: 'data/posts.db', autoload: true });

// Defining database methods
db.getallposts = function (){
	db.find({}, function (err, allPosts) {
		if(err){
			console.log('There was following error while fetching all the posts in the database: ' + err);
		}else {
			return allPosts;
		}
	});
};

db.addpost = function (post){
	db.insert(post, function (err, newPost){
		if(err){
			console.log('An error happened while trying to add a new post: ' + err);
		}else {
			console.log('Adding the new post was successful: ' + newPost);}
	})
};

db.deletepost = function (postId){
	db.remove({ id: postId }, {}, function(err, numRemoved){
		if(err){
			console.log('An error happened while trying to delete a post: ' + err);
		}else {
			console.log('Deleting the desired post was successful: ' + numRemoved);}
	});
};

db.upvote = function (postId){
	var upvote = db.find({ id: postId}, function (err, docs) {
    return docs.upvotes;
	});
	var newUpvote = upvote + 1;
	db.update({ id: postId }, {$set: { upvotes: newUpvote }});
};

db.downvote = function (postId){
	var downvote = db.find({ id: postId}, function (err, docs) {
    return docs.downvotes;
	});
	var newDownvote = upvote + 1;
	db.update({ id: postId }, {$set: { downvotes: newDownvote }});
};

db.addcomment = function (postId, newComment){
	// $push inserts new elements at the end of the array
	db.update({ _id: postId }, { $push: { comments: newComment } }, {}, function () {
	});
};

// Need to load each database (here we do it asynchronously)
db.posts.loadDatabase();



//// Will be used only in future version
//db.users = new Datastore({ filename: 'data/users.db', autoload: true });
//db.users.loadDatabase();


module.exports = db;