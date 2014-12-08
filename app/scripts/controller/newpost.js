//***********************************************
// NEWPOST CONTROLLER
//***********************************************

(function() {

    var app = angular.module('boah').controller('NewPostController', ['$scope', '$http', 'ajaxRequest', 'sharedProperties', 'sessionStore', 'websocket', function($scope, $http, ajaxRequest, sharedProperties, sessionStore, websocket) {
	    var userId = '';
	    var newPost = {};
        $scope.newPostCtrl = {};
	    $scope.tags = [{tag: 'Music'}, {tag: 'Movies'}, {tag: 'Books'}, {tag: 'Exhibitions'}, {tag: 'Trips'}];
        $scope.addPost = function () {
            userId = sharedProperties.getUserId();
	        newPost = {};

            // Random number is used for adding a random picture to the post
            var randomNumber = Math.floor(Math.random() * 20) + 1;
	        newPost.imgurl = "images/modernart"+ randomNumber +".jpg";
	        newPost.title = $scope.newPostCtrl.title;
	        newPost.url = $scope.newPostCtrl.url;
	        newPost.tag = $scope.newPostCtrl.tag.tag;
	        newPost.upvotes = 0;
	        newPost.downvotes = 0;
	        newPost.commented = 0;
		    newPost.creadtedBy = userId = sharedProperties.getUserId();
	        newPost.createdOn = Date.now();
	        newPost.comments = [];
	        newPost.newpostclass = "is-new";

            // Clearing out the scope and the input fields
	        $scope.newPostCtrl = {};
	        $('.big-nav input').removeClass('ng-dirty');

	        // Adding a new post using the ajaxRequest service
            websocket.sendSocket('newpost', 'hello');
	        ajaxRequest.post('/posts/'+ userId, newPost, function (response) {
		        newPost._id = response._id;

                // Updating also the sessionStore with the newly generated PostID
                sessionStore.addPost(newPost._id);
	        });

            // Updating our shared items triggering the relayouting
            sharedProperties.addItem(newPost);

            setTimeout(function(){
                $('.filter-item.all a').trigger('click');
                $('.sorting-item.newest a').trigger('click');
                $('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
            }, 100);
        };
    }]);

})();
