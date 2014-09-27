//***********************************************
// OUR CONTROLLER - WHERE ALL THE MAGIC HAPPENS
//***********************************************

(function() {
    var app = angular.module('postStore',[]);

	app.controller('UserController', ['$scope', 'ajaxRequest', function ($scope, ajaxRequest){
		$scope.userCtrl = {};

		self = this;
		self.checkLogin = function (){
			var loginData = {};
			loginData.login = $scope.userCtrl.login;
			loginData.password = $scope.userCtrl.password;
			console.log('logindata: ', loginData);
			ajaxRequest.post('/checklogin', loginData, function (response){
				if(response){
					console.log('Your login data was correct');
					alert('Your login data was correct');

					// Hide login box
					// Load user specific data (name, picture, posts)
					// Show logged in state
				}
			});
		};

	}] );


	var items ='';

    app.controller('PostController', ['$http', '$filter', 'ajaxRequest', 'filterFilter', function($http, $filter, ajaxRequest, filterFilter){

	    var self = this;

	    // Getting the data via Ajax request the Angular way
	    ajaxRequest.get('/posts', function (response) {
//		    console.log('Response from Ajax: ', response);
		    if (response) {
			    items = self.posts = response;
			    setTimeout(function(){
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
            }, 10);
		    }
	    });

	    this.filter = function(filter){
		    this.posts = items;
		    console.log(filter);
		    console.log(this.posts);
		    this.posts = filterFilter(this.posts, {tag:filter});
		    setTimeout(function(){
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
            }, 10);
	    };

	    this.order = function (order) {
		    console.log(this.posts);
	        if (order == 'date') {
	            self.posts = $filter('orderBy')(self.posts, 'id');
	        } else {
	            self.posts = $filter('orderBy')(self.posts, '-upvotes');
	        }
		    setTimeout(function(){
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
	            }, 10);
	        };
    }]);


    app.controller('NewPostController',['$scope', '$http', 'ajaxRequest', function($scope, $http, ajaxRequest) {
        $scope.newPostCtrl = {};
	    $scope.tags = [{tag: 'Animals'}, {tag: 'Fun'}, {tag: 'Scary'}, {tag: 'Movies'}, {tag: 'Games'}, {tag: 'Nature'}];
		var postId = items.length+1;
        this.addPost = function () {
	        var newPost = {};
	        console.log('sTags: ', $scope.tags);
	        console.log('nC Tags: ', $scope.newPostCtrl.tag.tag);
	        newPost.title = $scope.newPostCtrl.title;
	        newPost.url = $scope.newPostCtrl.url;
	        newPost.tag = $scope.newPostCtrl.tag.tag;
	        newPost.id = postId++;
	        newPost.imgurl = "images/bunny.png";
	        newPost.upvotes = 0;
	        newPost.downvotes = 0;
	        newPost.createdOn = Date.now();
	        newPost.comments = [];
	        $scope.newPostCtrl = {};
	        $('#big-nav input').removeClass('ng-dirty');


	        // Posting a new post using the ajaxRequest service
	        ajaxRequest.post('/addpost', newPost);
	        items.unshift(newPost);
	        console.log(items);
	        setTimeout(function(){
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
            }, 100);
        };
    }]);


    app.controller('ActionsController', ['$scope', 'ajaxRequest', function($scope, ajaxRequest){

        $scope.voteUp = function (postId) {
	        // We have to update our scope
	        var upvotedItem = $.grep(items, function (e){
	            return e.id == postId;
	        })[0];
	        upvotedItem.upvotes = upvotedItem.upvotes +1;
	        // And also the DB
	        ajaxRequest.update('/upvote', postId);
        };

	    $scope.voteDown = function (postId) {
		    var downvotedItem = $.grep(items, function (e){
	            return e.id == postId;
	        })[0];
	        downvotedItem.downvotes = downvotedItem.downvotes +1;
	        ajaxRequest.update('/downvote', postId);
        };

        $scope.erase = function (postId, postIndex) {
	        // Updating the view
	        items.splice(postIndex, 1);
	        setTimeout(function(){
		        $('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
	        }, 10);
	        // And the DB
	        ajaxRequest.remove('/remove/', postId);

        };

	    $scope.showComments = function (e) {
		    console.log('showComments function is triggered');
		    $(e.currentTarget).closest('.post').find('.comments-container').toggle(200, function () {
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
		    });
        };

	    $scope.postComment = function (post) {
		    newComment = $scope.actionsCtrl.newComment;
		    postId = post.id;

		    // Update the scope, reset the layout, empty the form & make it undirty
		    post.comments.push(newComment);
			setTimeout(function(){
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
            }, 100);
		    $scope.actionsCtrl.newComment = '';
		    $('.comment-box input').removeClass('ng-dirty');

		    // Update the DB
		    ajaxRequest.update('/newcomment', postId, newComment);
	    };

	    $scope.toggleNavigation = function () {
			$('#big-nav').toggle(300);
	    }
    }]);
})();