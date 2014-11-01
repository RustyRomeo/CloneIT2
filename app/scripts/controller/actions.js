//***********************************************
// ACTIONS CONTROLLER
//***********************************************

(function() {
	var app = angular.module('cloneIT').controller('ActionsController', ['$scope', 'ajaxRequest', 'sharedProperties', function($scope, ajaxRequest, sharedProperties){

		var items = '';
		var userId = '';

        $scope.voteUp = function (postId, ev) {

	        var $currentTarget = $(ev.currentTarget);
	        var $downvoteAnchor = $currentTarget.closest('ul').find('a[data-function="downvote"]');
	        items = sharedProperties.getItems();
	        userId = sharedProperties.getUserId();

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
	    items = sharedProperties.getItems();
	    userId = sharedProperties.getUserId();

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

            // Check if user has the permission to delete post (postId = one of the session posts)
            var sessionPosts = JSON.parse(sessionStorage.posts);
            if (sessionPosts.indexOf(postId) > -1){

                // Updating the view
                items = sharedProperties.getItems();
                items.splice(postIndex, 1);
                sharedProperties.setItems(items);
                console.log(postId);
                setTimeout(function(){
                    $('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
                }, 10);
                // And the DB
                ajaxRequest.update('/remove', postId);
            }
        };

	    $scope.showComments = function (e) {

		    // Show comments box only if there are any comments to show or the user is logged in (= comments box is not hidden)
		    if (e.currentTarget.parentElement.innerText > 0 || !$('.new-form').hasClass('hidden')) {
			    var $selectedCommentsContainer = $(e.currentTarget).closest('.post').find('.comments-container');

			    // In case the comments container is already open, close it
			    if($selectedCommentsContainer.css('display') == 'block'){
				    $selectedCommentsContainer.hide(200, function () {
						$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
				    });
				    $selectedCommentsContainer.css('display', 'none');
			    }
				else {    $('.comments-container').hide(200);
				    $selectedCommentsContainer.show(200, function () {
						$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
				    });
			    }
            }
	    };

	    $scope.postComment = function (post, e) {
		    newComment = $scope.actionsCtrl.newComment;
		    postId = post._id;

		    // Update the scope, reset the layout, empty the form & make it undirty
		    post.comments.push(newComment);
		    post.commented = post.commented + 1;
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
		    items = sharedProperties.getItems();
		    $('.goodbye-msg').show(0).delay(3000).fadeOut(150).hide(0);
	        $('.header_logged-in').hide(500);
		    $('.header_logged-out').show(500);
		    $('.big-nav').delay(3000).toggle(400);
		    $('.show-new-link').text('Add new link');
            $('.is-upvoted').removeClass('is-upvoted');
            $('.is-downvoted').removeClass('is-downvoted');
            $('form.new-form').addClass('hidden');
            $('body').addClass('not-logged-in');
		    $scope.user.password = '';
		    ajaxRequest.update('/logout');

		    items.forEach(function(entry) {
				entry.publisherclass = '';
			    entry.upvoteclass = '';
			    entry.downvoteclass = '';
			    entry.newpostclass = '';
			});

            sessionStorage.removeItem('posts');
            sessionStorage.removeItem('upvotes');
            sessionStorage.removeItem('downvotes');

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
