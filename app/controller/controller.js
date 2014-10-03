//***********************************************
// OUR CONTROLLER - WHERE ALL THE MAGIC HAPPENS
//***********************************************

(function() {
    var app = angular.module('postStore',[]);

	app.controller('UserController', ['$scope', 'ajaxRequest', function ($scope, ajaxRequest){
		$scope.userCtrl = {};
		$scope.remember = {};

		self = this;
		self.checkLogin = function (){
			console.log('Triggered');
			var loginData = {};
			loginData.login = $scope.userCtrl.login;
			loginData.password = $scope.userCtrl.password;

			loginData.remember = $scope.userCtrl.remember;
			$('.big-nav input').removeClass('ng-dirty');
			ajaxRequest.post('/checklogin', loginData, function (response){
				if(response){
					$scope.userCtrl.firstname = response.firstname;
					$scope.userCtrl.lastname = response.lastname;
					$scope.userCtrl.image = response.image;
				}
			});
		};

		$scope.newUser = {};
		self.signup = function (){
			var newUser = {};
			var randomNumber = Math.round(Math.random()*5);
			newUser.username = $scope.newUser.username;
			newUser.email = $scope.newUser.email;
			newUser.firstname = $scope.newUser.firstname;
			newUser.lastname = $scope.newUser.lastname;
			newUser.password = $scope.newUser.password;
			newUser.image = "images/portrait" + randomNumber + ".png";
			newUser.createdOn = Date.now();
			console.log(newUser);
			ajaxRequest.post('/newuser', newUser, function (response){
				if(response[0] === 'user-added-successfully'){
					$scope.userCtrl = response[1];
				}else if(response[0] === 'already-taken'){
					$scope.newUser.username = '';
				}
			});

		};

	}] );


	var items ='';

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

	    this.filter = function(filter){
		    this.posts = items;
		    this.posts = filterFilter(this.posts, {tag:filter});
		    setTimeout(function(){
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
            }, 10);
	    };

	    this.order = function (order) {
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
	    $scope.tags = [{tag: 'Fun'}, {tag: 'Scary'}, {tag: 'Movies'}, {tag: 'Games'}, {tag: 'Nature'}];
		var postId = items.length+1;
        this.addPost = function () {
	        var newPost = {};
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
	        $('.big-nav input').removeClass('ng-dirty');


	        // Posting a new post using the ajaxRequest service
	        ajaxRequest.post('/addpost', newPost);
	        items.unshift(newPost);
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
		    $('.goodbye-msg').show(0).delay(3000).fadeOut(150);
	        $('.header_logged-in').hide(500);
		    $('.header_logged-out').show(500);
		    $('.big-nav').delay(3000).toggle(400);
		    ajaxRequest.update('/logout');
	    };

	    $scope.showSignup = function (){
			console.log('Im signing up!');
		    $('.header_logged-out').hide(500);
		    $('.header_sign-up').show(500);
	    };
    }]);
})();