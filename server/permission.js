//******************************************************
// CHECKS PERMISSIONS TO DELETE, UPVOTE & DOWNVOTE POST
//******************************************************


permission = {};
var userPosts = [];

permission.checkDeletion = function (postId, userId, callback){

    // Check if there is a user with userId in db
    db.users.find({_id: userId } , function (err, foundPosts){
        if(err){
			console.log('There was following error when trying to retrieve user name: ' + err);
		}

        else {
			userPosts = foundPosts[0].posts;
        }

        // Check if there is an element postId in the userPosts array
        if(userPosts.indexOf(postId) > -1){
            callback('permission-ok');
        }

        else{
            callback('permission-denied');
        }
    });

};

permission.checkUpvoting = function (postId, userId, callback){

    db.users.find({_id: userId } , function (err, foundPosts){
        if(err){
			console.log('There was following error when trying to retrieve user name: ' + err);
		}

        else {
			var userPosts = foundPosts[0].upvotes;
        }

        // Check if there is an element postId in the userPosts array
        if(userPosts.indexOf(postId) > -1){

            // If the element is found, the user shouldn't upvote again
            callback('permission-denied');
        }

        else{
            callback('permission-ok');
        }
    });

};

permission.checkUpvoteRemoval = function (postId, userId, callback){

    db.users.find({_id: userId } , function (err, foundPosts){
        if(err){
			console.log('There was following error when trying to retrieve user name: ' + err);
		}

        else {
			userPosts = foundPosts[0].upvotes;
        }

        // Check if there is an element postId in the userPosts array
        if(userPosts.indexOf(postId) > -1){
            callback('permission-ok');
        }

        else{
            callback('permission-denied');
        }
    });

};

permission.checkDownvoting = function (postId, userId, callback){

    db.users.find({_id: userId } , function (err, foundPosts){
        if(err){
			console.log('There was following error when trying to retrieve user name: ' + err);
		}

        else {
			userPosts = foundPosts[0].downvotes;
        }

        // Check if there is an element postId in the userPosts array
        if(userPosts.indexOf(postId) > -1){

            // If the element is found, the user shouldn't downvote again
            callback('permission-denied');
        }

        else {
            callback('permission-ok');
        }
    });

};

permission.checkDownvoteRemoval = function (postId, userId, callback){

    db.users.find({_id: userId } , function (err, foundPosts){
        if(err){
			console.log('There was following error when trying to retrieve user name: ' + err);
		}

        else {
			userPosts = foundPosts[0].downvotes;
        }

        // Check if there is an element postId in the userPosts array
        if(userPosts.indexOf(postId) > -1){
            callback('permission-ok');

        }else{
            callback('permission-denied');
        }
    });

};
