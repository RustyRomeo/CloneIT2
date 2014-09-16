var Datastore = require('nedb');

db = {};
db.posts = new Datastore({ filename: 'app/data/posts.db', autoload: true });

// Defining database methods
db.getallposts = function (){
	db.posts.find({}, function (err, allPosts) {
		if(err){
			console.log('There was following error while fetching all the posts in the database: ' + err);
		}else {
			return allPosts;
		}
	});
};

db.addpost = function (post){
	db.posts.insert(post, function (err, newPost){
		if(err){
			console.log('An error happened while trying to add a new post: ' + err);
		}else {
			console.log('Adding the new post was successful: ' + newPost);}
	})
};

db.deletepost = function (postId){
	db.posts.posts.remove({ id: postId }, {}, function(err, numRemoved){
		if(err){
			console.log('An error happened while trying to delete a post: ' + err);
		}else {
			console.log('Deleting the desired post was successful: ' + numRemoved);}
	});
};

db.upvote = function (res){
//	var upvote = db.posts.posts.find({ id: postId}, function (err, docs) {
	var upvote = db.posts.find({ id: 5}, function (err, docs) {
    return docs.upvotes;
	});
	res.send('Your upvote reached the db with the number: ' + upvote);
//	var newUpvote = upvote + 1;
//	db.update({ id: postId }, {$set: { upvotes: newUpvote }});
};

db.downvote = function (postId){
	var downvote = db.posts.find({ id: postId}, function (err, docs) {
    return docs.downvotes;
	});
	var newDownvote = upvote + 1;
	db.posts.update({ id: postId }, {$set: { downvotes: newDownvote }});
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

 var items = [
        {
            id: 1,
            title: "Poroshenko announces accord on cease-fire in eastern Ukraine",
            url: "http://tagi.ch",
            imgurl: "images/bunny.png",
            upvotes: 2,
            downvotes: 4,
            createdOn: 1397493980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 2,
            title: "Another brick in the wall or wall?",
            url: "http://tagi.ch",
            imgurl: "images/husky.png",
            upvotes: 3,
            downvotes: 4,
            createdOn: 13974936980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 3,
            title: "The tourists may be well-intentioned. But that doesn’t mean the photos they’re taking of the Mashco-Piro people in a Peruvian forest, near the Brazilian border, are a good idea.",
            url: "http://tagi.ch",
            imgurl: "images/panther.png",
            upvotes: 4,
            downvotes: 2,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 4,
            title: "Hiring slows in August as U.S. adds 142K jobs",
            url: "http://tagi.ch",
            imgurl: "images/bunny.png",
            upvotes: 2,
            downvotes: 6,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 5,
            title: "Poroshenko announces accord on cease-fire in eastern Ukraine",
            url: "http://tagi.ch",
            imgurl: "images/husky.png",
            upvotes: 6,
            downvotes: 1,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 6,
            title: "Another brick in the wall or wall?",
            url: "http://tagi.ch",
            imgurl: "images/panther.png",
            upvotes: 1,
            downvotes: 4,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 7,
            title: "somewhat crazy",
            url: "http://tagi.ch",
            imgurl: "images/bunny.png",
            upvotes: 4,
            downvotes: 7,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 8,
            title: "Hiring slows in August as U.S. adds 142K jobs",
            url: "http://tagi.ch",
            imgurl: "images/husky.png",
            upvotes: 3,
            downvotes: 8,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 9,
            title: "Another brick in the wall or wall?",
            url: "http://tagi.ch",
            imgurl: "images/panther.png",
            upvotes: 8,
            downvotes: 2,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 10,
            title: "Another brick in the wall or wall?",
            url: "http://tagi.ch",
            imgurl: "images/bunny.png",
            upvotes: 2,
            downvotes: 5,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 11,
            title: "Poroshenko announces accord on cease-fire in eastern Ukraine",
            url: "http://tagi.ch",
            imgurl: "images/husky.png",
            upvotes: 5,
            downvotes: 2,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 12,
            title: "Another brick in the wall or wall?",
            url: "http://tagi.ch",
            imgurl: "images/panther.png",
            upvotes: 2,
            downvotes: 7,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 13,
            title: "The tourists may be well-intentioned. But that doesn’t mean the photos they’re taking of the Mashco-Piro people in a Peruvian forest, near the Brazilian border, are a good idea.",
            url: "http://tagi.ch",
            imgurl: "images/bunny.png",
            upvotes: 7,
            downvotes: 2,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 14,
            title: "Hiring slows in August as U.S. adds 142K jobs",
            url: "http://tagi.ch",
            imgurl: "images/husky.png",
            upvotes: 2,
            downvotes: 4,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 15,
            title: "The tourists may be well-intentioned. But that doesn’t mean the photos they’re taking of the Mashco-Piro people in a Peruvian forest, near the Brazilian border, are a good idea.",
            url: "http://tagi.ch",
            imgurl: "images/panther.png",
            upvotes: 4,
            downvotes: 6,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 16,
            title: "Another brick in the wall or wall?",
            url: "http://tagi.ch",
            imgurl: "images/bunny.png",
            upvotes: 6,
            downvotes: 1,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 17,
            title: "Poroshenko announces accord on cease-fire in eastern Ukraine",
            url: "http://tagi.ch",
            imgurl: "images/husky.png",
            upvotes: 1,
            downvotes: 1,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 18,
            title: "Hiring slows in August as U.S. adds 142K jobs",
            url: "http://tagi.ch",
            imgurl: "images/panther.png",
            upvotes: 6,
            downvotes: 4,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        }
    ];

//db.posts.insert(items, function (err, newDoc){
//
//});

db.posts.find({}, function (err, allPosts) {
		if(err){
			console.log('There was following error while fetching all the posts in the database: ' + err);
		}else {
			console.log(allPosts);
			return allPosts;
		}
	});