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
					$('body').removeClass('not-logged-in');
					$('form.new-form').removeClass('hidden');

					console.log('RESponse: ', response);
					// Check which posts where upvote, downvoted or created by user
					response.upvotes.forEach(function(entry) {

						items.forEach(function(post){
							if(post._id === entry){
								post.upvoteclass = 'is-upvoted';
							}
						});
					});

					response.downvotes.forEach(function(entry) {

						items.forEach(function(post){
							if(post._id === entry){
								post.downvoteclass = 'is-downvoted';
							}
						});
					});

					response.posts.forEach(function(entry) {

						items.forEach(function(post){
							if(post._id === entry){
								post.publisherclass = 'is-publisher';
								console.log(post);
							}
						});
					});
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

		    response.forEach(function(entry) {
				console.log('Response Logger: ', entry);
			    if(entry.newpostclass){
				    entry.newpostclass = '';
			    }
			});

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
	            self.posts = $filter('orderBy')(self.posts, '-createdOn');
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
        $scope.newPostCtrl = {};
	    var newPost = {};
	    $scope.tags = [{tag: 'Fun'}, {tag: 'Scary'}, {tag: 'Movies'}, {tag: 'Games'}, {tag: 'Nature'}];
        $scope.addPost = function () {
	        newPost = {};
	        newPost.title = $scope.newPostCtrl.title;
	        newPost.url = $scope.newPostCtrl.url;
	        newPost.tag = $scope.newPostCtrl.tag.tag;
	        newPost.imgurl = "images/bunny.png";
	        newPost.upvotes = 0;
	        newPost.downvotes = 0;
	        newPost.commented = 0;
	        newPost.createdBy = userId;
	        newPost.createdOn = Date.now();
	        newPost.comments = [];
	        newPost.newpostclass = "is-new";
	        $scope.newPostCtrl = {};
	        $('.big-nav input').removeClass('ng-dirty');


	        // Posting a new post using the ajaxRequest service
	        ajaxRequest.post('/addpost', newPost, function (response) {
		        newPost._id = response._id;
		        ajaxRequest.updateUserPost('/post-by-user', newPost._id, userId);
	        });


	        items.unshift(newPost);
	        setTimeout(function(){
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
            }, 100);
        };
    }]);

	// ActionsController handles all the actions like up- and downvoting, posting and showing comments and erasing posts
    app.controller('ActionsController', ['$scope', 'ajaxRequest', function($scope, ajaxRequest){

        $scope.voteUp = function (postId, ev) {

	        var $currentTarget = $(ev.currentTarget);
	        var $downvoteAnchor = $currentTarget.closest('ul').find('a[data-function="downvote"]');

	        // Up- and downvoting the same post is not possible, so we check if the now upvoted post is already downvoted
	        if (!$currentTarget.hasClass('is-upvoted') && $downvoteAnchor.hasClass('is-downvoted')){

		        console.log('Upvoted and Downvoted!');
		        // Remove downvoting
		        var downvotedItem = $.grep(items, function (e){
		            return e._id == postId;
		        })[0];
	            downvotedItem.downvotes = downvotedItem.downvotes -1;
		        $downvoteAnchor.removeClass('is-downvoted');

		        ajaxRequest.update('/remove-downvote', postId);
		        ajaxRequest.updateUserDownvote('/remove-downvote-by-user', postId, userId);

		        // Add upvoting
		        upvotedItem = $.grep(items, function (e){
	            return e._id == postId;
		        })[0];
		        upvotedItem.upvotes = upvotedItem.upvotes +1;
		        $(ev.currentTarget).addClass('is-upvoted');

		        // And also the DB
		        ajaxRequest.update('/upvote', postId);
		        ajaxRequest.updateUserUpvote('/upvote-by-user', postId, userId);
		    }

	        // If the upvoted post is already upvoted, we remove the upvote
	        else if($currentTarget.hasClass('is-upvoted')){
		        upvotedItem = $.grep(items, function (e){
	            return e._id == postId;
	            })[0];
		        upvotedItem.upvotes = upvotedItem.upvotes -1;
		        $(ev.currentTarget).removeClass('is-upvoted');

			    ajaxRequest.update('/remove-upvote', postId);
			    ajaxRequest.updateUserUpvote('/remove-upvote-by-user', postId, userId);
	        }

	        else if ($('body').hasClass('not-logged-in')){
		        alert('Please log in to vote on this post');
	        }

	        // If the upvoted post was not upvoted or downvoted, we just add the upvote
	        else {
	        var upvotedItem = $.grep(items, function (e){
	            return e._id == postId;
	        })[0];
	        upvotedItem.upvotes = upvotedItem.upvotes +1;
	        $(ev.currentTarget).addClass('is-upvoted');

	        // And also the DB
	        ajaxRequest.update('/upvote', postId);
	        ajaxRequest.updateUserUpvote('/upvote-by-user', postId, userId);
        }};


        $scope.voteDown = function (postId, ev) {

	    var $currentTarget = $(ev.currentTarget);
        var $upvoteAnchor = $currentTarget.closest('ul').find('a[data-function="upvote"]');

        // Up- and downvoting the same post is not possible, so we check if the now upvoted post is already downvoted
	    if (!$currentTarget.hasClass('is-downvoted') && $upvoteAnchor.hasClass('is-upvoted')){

	        // Remove upvoting
	        var upvotedItem = $.grep(items, function (e){
	            return e._id == postId;
	        })[0];
            upvotedItem.upvotes = upvotedItem.upvotes -1;
	        $upvoteAnchor.removeClass('is-upvoted');

	        ajaxRequest.update('/remove-upvote', postId);
	        ajaxRequest.updateUserDownvote('/remove-upvote-by-user', postId, userId);

	        // Add downvoting
	        var downvotedItem = $.grep(items, function (e){
            return e._id == postId;
	        })[0];
	        downvotedItem.downvotes = downvotedItem.downvotes +1;
	        $currentTarget.addClass('is-downvoted');

	        // And also the DB
	        ajaxRequest.update('/downvote', postId);
	        ajaxRequest.updateUserUpvote('/downvote-by-user', postId, userId);
	    }


	    else if($(ev.currentTarget).hasClass('is-downvoted')){
		    downvotedItem = $.grep(items, function (e){
	            return e._id == postId;
	        })[0];
            downvotedItem.downvotes = downvotedItem.downvotes -1;
	        $(ev.currentTarget).removeClass('is-downvoted');

	        ajaxRequest.update('/remove-downvote', postId);
	        ajaxRequest.updateUserDownvote('/remove-downvote-by-user', postId, userId);
        }
        else if ($('body').hasClass('not-logged-in')){
	        alert('Please log in to vote on this post');
        }

	    else {
		    downvotedItem = $.grep(items, function (e){
			    return e._id == postId;
		    })[0];

	        downvotedItem.downvotes = downvotedItem.downvotes +1;
		    $(ev.currentTarget).addClass('is-downvoted');
		    $(ev.currentTarget).addClass('is-downvoted');
	        ajaxRequest.update('/downvote', postId);
		    ajaxRequest.updateUserDownvote('/downvote-by-user', postId, userId);
        }};

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
		    // Show comments only if there are any comments to show
		    if (e.currentTarget.parentElement.innerText > 0){
			    $(e.currentTarget).closest('.post').find('.comments-container').toggle(200, function () {
					$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
			    });
		    }
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

		    items.forEach(function(entry) {
				entry.publisherclass = '';
			    entry.upvoteclass = '';
			    entry.downvoteclass = '';
			    entry.newpostclass = '';
			});
	    $('.is-upvoted').removeClass('is-upvoted');
	    $('.is-downvoted').removeClass('is-downvoted');
		$('form.new-form').addClass('hidden');
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