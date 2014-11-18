//***********************************************
// USER CONTROLLER
//***********************************************

(function() {

	// UserController handles login and new signup attempts
	var app = angular.module('boah').controller('UserController', ['$scope', 'ajaxRequest', 'sharedProperties', function ($scope, ajaxRequest, sharedProperties){

        var items = '';
	    var userId = '';

		$scope.user = {};
		$scope.remember = {};

        self = this;
		self.checkLogin = function (login){
			userId = sharedProperties.getUserId();
            var sessionCookie = $.cookie('session');
			var loginData = {};

            if (login == 'autologin' && sessionCookie) {
                loginData.session = sessionCookie;

            } else if (login == 'userlogin') {
                loginData.login = $scope.user.login;
                loginData.password = $scope.user.password;
                loginData.remember = $scope.user.remember;
                loginData.session = sessionCookie;
                $('.big-nav input').removeClass('ng-dirty');
                $scope.user.login = '';
                $scope.user.password = '';
            } else {
                return
            }
			ajaxRequest.post('/users/login', loginData, function (response){
				if(response){
                    items = sharedProperties.getItems();
					$scope.user.firstname = response.firstname;
					$scope.user.lastname = response.lastname;
					$scope.user.image = response.image;

                    sessionStorage.setItem('posts', JSON.stringify(response.posts));
                    sessionStorage.setItem('upvotes', JSON.stringify(response.upvotes));
                    sessionStorage.setItem('downvotes', JSON.stringify(response.downvotes));

					userId = response._id;
					sharedProperties.setUserId(userId);
					$('body').removeClass('not-logged-in');
					$('form.new-form').removeClass('hidden');

					// Check which posts where upvoted, downvoted or created by user
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
			ajaxRequest.post('/users', newUser, function (response){
				if(response[0] === 'user-added-successfully'){
                    var currentUser = response[1];
					$scope.user = currentUser;
                    console.log('REsponse New User: ', response);
                    userId = currentUser._id;
					$scope.newUser = '';
					$('.big-nav input').removeClass('ng-dirty');
                    $('body').removeClass('not-logged-in');
                    $('form.new-form').removeClass('hidden');
                    sharedProperties.setUserId(userId);
                    sessionStorage.setItem("upvotes", "");
                    sessionStorage.setItem("downvotes","");
                    sessionStorage.setItem('posts', "");

				}else if(response[0] === 'already-taken'){
					$scope.newUser.username = '';
				}
			});

		};

        setTimeout(function(){
            self.checkLogin('autologin');
        },100);

	}] );

})();
