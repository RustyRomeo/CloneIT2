//***********************************************
// OUR CONTROLLER - WHERE ALL THE MAGIC HAPPENS
//***********************************************

(function() {
    var app = angular.module('postStore',[]);

	var userId = '';

	// UserController handles login and new signup attempts
	app.controller('UserController', ['$scope', 'ajaxRequest', function ($scope, ajaxRequest){
		$scope.user = {};
		$scope.remember = {};

		self = this;
		self.checkLogin = function (){
			var loginData = {};
			loginData.login = $scope.user.login;
			loginData.password = $scope.user.password;

			loginData.remember = $scope.user.remember;
			$('.big-nav input').removeClass('ng-dirty');
			$scope.user.login = '';
			$scope.user.password = '';
			ajaxRequest.post('/checklogin', loginData, function (response){
				if(response){
					$scope.user.firstname = response.firstname;
					$scope.user.lastname = response.lastname;
					$scope.user.image = response.image;
					userId = response._id;
					console.log(userId);
				}
			});
		};

		$scope.newUser = {};
		self.signup = function (){
			var newUser = {};
			var randomNumber = Math.floor(Math.random() * 5) + 1;
			newUser.username = $scope.newUser.username;
			newUser.email = $scope.newUser.email;
			newUser.firstname = $scope.newUser.firstname;
			newUser.lastname = $scope.newUser.lastname;
			newUser.password = $scope.newUser.password;
			newUser.image = "images/portrait" + randomNumber + ".png";
			newUser.createdOn = Date.now();
			ajaxRequest.post('/newuser', newUser, function (response){
				if(response[0] === 'user-added-successfully'){
					$scope.user = response[1];
					$scope.newUser = '';
					$('.big-nav input').removeClass('ng-dirty');

				}else if(response[0] === 'already-taken'){
					$scope.newUser.username = '';
				}
			});

		};

	}] );


	var items ='';

	// PostController fetches all the posts from the DB and handles filtering and sorting
    app.controller('PostController', ['$http', '$filter', 'ajaxRequest', 'filterFilter', function($http, $filter, ajaxRequest, filterFilter){

	    var self = this;

	    // Getting the data via Ajax request the Angular way
	    ajaxRequest.get('/posts', function (response) {
		    if (response) {
			    items = self.posts = response;
			    setTimeout(function(){
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
            }, 10);
		    }
	    });

	    this.filter = function(filter, e){
		    e.preventDefault();
		    this.posts = items;
		    this.posts = filterFilter(this.posts, {tag:filter});
		    setTimeout(function(){
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
            }, 10);
	    };

	    this.order = function (order, e) {
		    e.preventDefault();
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

	// NewPostController handles the creation of new posts
    app.controller('NewPostController',['$scope', '$http', 'ajaxRequest', function($scope, $http, ajaxRequest) {
	    var self = this;
        $scope.newPostCtrl = {};
	    var newPost = {};
	    $scope.tags = [{tag: 'Fun'}, {tag: 'Scary'}, {tag: 'Movies'}, {tag: 'Games'}, {tag: 'Nature'}];
        self.addPost = function () {
	        console.log('Howdy!');
	        newPost.title = $scope.newPostCtrl.title;
	        newPost.url = $scope.newPostCtrl.url;
	        newPost.tag = $scope.newPostCtrl.tag.tag;
	        newPost.imgurl = "images/bunny.png";
	        newPost.upvotes = 0;
	        newPost.downvotes = 0;
	        newPost.createdBy = userId;
	        newPost.createdOn = Date.now();
	        newPost.comments = [];
	        $scope.newPostCtrl = {};
	        $('.big-nav input').removeClass('ng-dirty');


	        // Posting a new post using the ajaxRequest service
	        ajaxRequest.post('/addpost', newPost, function (response) {
		        newPost._id = response._id;
		        console.log('newPost', newPost);
	        });

	        items.unshift(newPost);
	        console.log(items);
	        setTimeout(function(){
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
            }, 100);
        };
    }]);

	// ActionsController handles all the actions like up- and downvoting, posting and showing comments and erasing posts
    app.controller('ActionsController', ['$scope', 'ajaxRequest', function($scope, ajaxRequest){

        $scope.voteUp = function (postId) {
	        // We have to update our scope
	        var upvotedItem = $.grep(items, function (e){
	            return e._id == postId;
	        })[0];
	        upvotedItem.upvotes = upvotedItem.upvotes +1;
	        // And also the DB
	        ajaxRequest.update('/upvote', postId);
        };

	    $scope.voteDown = function (postId) {
		    var downvotedItem = $.grep(items, function (e){
	            return e._id == postId;
	        })[0];
	        downvotedItem.downvotes = downvotedItem.downvotes +1;
	        ajaxRequest.update('/downvote', postId);
        };

        $scope.erase = function (postId, postIndex) {
	        // Updating the view
	        console.log('Post Index: ', postIndex);
	        items.splice(postIndex, 1);
	        console.log(postId);
	        setTimeout(function(){
		        $('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
	        }, 10);
	        // And the DB
	        ajaxRequest.update('/remove', postId);
        };

	    $scope.showComments = function (e) {
		    $(e.currentTarget).closest('.post').find('.comments-container').toggle(200, function () {
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
		    });
        };

	    $scope.postComment = function (post) {
		    newComment = $scope.actionsCtrl.newComment;
		    postId = post._id;

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

	    $scope.toggleLogin = function () {
		    $('.big-nav').toggle(300);
	    };

	    $scope.toggleNavigation = function (){
		    $('.big-nav').toggle(300);
		    var $showNewLink = $('.show-new-link');
		    var showNewLinkText = $showNewLink.text();
		    if(showNewLinkText === 'Add new link'){
			    $showNewLink.text('Close');
		    }else {
			    $showNewLink.text('Add new link');
		    }
	    };

	    $scope.logout = function (){
		    $('.goodbye-msg').show(0).delay(3000).fadeOut(150).hide(0);
	        $('.header_logged-in').hide(500);
		    $('.header_logged-out').show(500);
		    $('.big-nav').delay(3000).toggle(400);
		    $('.show-new-link').text('Add new link');
		    $scope.user.password = '';
		    ajaxRequest.update('/logout');
	    };

	    $scope.showSignup = function (){
		    $('.header_logged-out').hide(500);
		    $('.header_sign-up').show(500);
	    };

	     $scope.closeSignup = function (){
		    $('.header_logged-out').show(500);
		    $('.header_sign-up').hide(500);
	    };
    }]);
})();