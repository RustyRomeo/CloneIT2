//***********************************************
// NEWPOST CONTROLLER
//***********************************************

(function() {

    var app = angular.module('boah').controller('NewPostController', ['$scope', '$http', 'ajaxRequest', 'sharedProperties', 'sessionStore', 'websocket', function($scope, $http, ajaxRequest, sharedProperties, sessionStore, websocket) {
	    var userId = '';
        $scope.newPostCtrl = {};
	    var newPost = {};
	    $scope.tags = [{tag: 'Music'}, {tag: 'Movies'}, {tag: 'Books'}, {tag: 'Exhibitions'}, {tag: 'Trips'}];
        $scope.addPost = function () {
            userId = sharedProperties.getUserId();
	        newPost = {};
	        newPost.title = $scope.newPostCtrl.title;
	        newPost.url = $scope.newPostCtrl.url;
	        newPost.tag = $scope.newPostCtrl.tag.tag;
	        newPost.imgurl = "images/bunny.png";
	        newPost.upvotes = 0;
	        newPost.downvotes = 0;
	        newPost.commented = 0;
		    newPost.creadtedBy = userId = sharedProperties.getUserId();
	        newPost.createdOn = Date.now();
	        newPost.comments = [];
	        newPost.newpostclass = "is-new";
	        $scope.newPostCtrl = {};
	        $('.big-nav input').removeClass('ng-dirty');

	        // Adding a new post using the ajaxRequest service
            websocket.sendSocket('newpost', 'hello');
	        ajaxRequest.post('/posts/'+ userId, newPost, function (response) {
		        newPost._id = response._id;

                // Updating also the sessionStore with the newly generated PostID
                sessionStore.addPost(newPost._id);
	        });

            sharedProperties.addItem(newPost);
            setTimeout(function(){
                $('.filter-item.all a').trigger('click');
                $('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
            }, 100);
        };
    }]);

})();
