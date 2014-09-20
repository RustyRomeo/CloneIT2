//***********************************************
// OUR CONTROLLER - WHERE ALL THE MAGIC HAPPENS
//***********************************************

(function() {
    var app = angular.module('postStore',[]);

    app.controller('PostController', ['$http', 'ajaxRequest', function($http, ajaxRequest){
        this.posts = items;

	    // Getting the data via Ajax request the Angular way
//	    this.posts = ajaxRequest.get('/posts');
    }]);


    app.controller('NewPostController',['$scope', '$http', 'ajaxRequest', function($scope, $http, ajaxRequest) {
        $scope.newPost = {};
		var postId = items.length+1;
        this.addPost = function () {
	        var newPost = {};
	        newPost.title = $scope.newPost.title;
	        newPost.url = $scope.newPost.url;
	        newPost.id = postId++;
	        newPost.imgurl = "images/bunny.png";
	        newPost.upvotes = 0;
	        newPost.downvotes = 0;
	        newPost.createdOn = Date.now();
	        newPost.comments = [];

	        // Posting a new post using the ajaxRequest service
	        ajaxRequest.post('/addpost', newPost);
        };
    }]);


    app.controller('ActionsController', ['$scope', 'ajaxRequest', function($scope, ajaxRequest){

        $scope.voteUp = function (postId) {
	        var upvotedItem = items[postId-1];
	        upvotedItem.upvotes = upvotedItem.upvotes +1;
	        ajaxRequest.update('/upvote', postId);
        };

	    $scope.voteDown = function (postId) {
		    var downvotedItem = items[postId-1];
	        downvotedItem.downvotes = downvotedItem.downvotes +1;
	        ajaxRequest.update('/downvote', postId);
        };

        $scope.erase = function (postId, postIndex) {
	        items.splice(postIndex, 1);
	        ajaxRequest.remove('/remove/', postId);

	        setTimeout(function(){
		        $('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
	        }, 10);
        };

	    $scope.showComments = function (e) {
		    console.log('showComments function is triggered');
		    $(e.currentTarget).closest('.post').find('.comments-container').toggle(200, function () {
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
		    });
        };

	    $scope.postComment = function (postId) {
		    newComment = $scope.actions.newComment;
		    ajaxRequest.update('/newcomment', postId, newComment);
		    $scope.actions.newComment = '';
		    console.log($scope);
	    };

	    $scope.toggleNavigation = function () {
			$('#big-nav').toggle(300);
	    }
    }]);


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
})();