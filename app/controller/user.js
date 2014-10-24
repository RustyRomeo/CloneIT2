//***********************************************
// USER CONTROLLER
//***********************************************

(function() {
    var app = angular.module('cloneIT',[]);

	var items = '';
	var userId = '';

	// UserController handles login and new signup attempts
	app.controller('UserController', ['$scope', 'ajaxRequest', 'sharedProperties', function ($scope, ajaxRequest, sharedProperties){
		$scope.user = {};
		$scope.remember = {};

		self = this;
		self.checkLogin = function (){
			items = sharedProperties.getItems();
			userId = sharedProperties.getUserId();
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
					sharedProperties.setUserId(userId);
					$('body').removeClass('not-logged-in');
					$('form.new-form').removeClass('hidden');

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
})();