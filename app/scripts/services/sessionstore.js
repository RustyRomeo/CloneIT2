'use strict';

//***********************************************
// SESSION STORAGE SERVICE
//***********************************************

var app = angular.module('cloneIT');

app.service('sessionStore', function(){
	var userId = '';
	var items = '';

	return {
		addPost: function (postId){
			var posts = JSON.parse(sessionStorage.getItem('posts'));
            console.log('Posts before: ', posts);
            posts.push(postId);
            console.log('Posts after: ', posts);
            sessionStorage.setItem('posts', JSON.stringify(posts));
		},
		removePost: function (postId){
            var posts = JSON.parse(sessionStorage.getItem('posts'));
            console.log('Posts before: ', posts);
            var index = posts.indexOf(postId);
            if (index > -1) {
                posts.splice(index, 1);
            }
            console.log('Posts after: ', posts);
            sessionStorage.setItem('posts', JSON.stringify(posts));
		},
		addUpvote: function (postId){
			var upvotes = JSON.parse(sessionStorage.getItem('upvotes'));
            console.log('Upvotes before: ', upvotes);
            upvotes.push(postId);
            console.log('Upvotes after: ', upvotes);
            sessionStorage.setItem('upvotes', JSON.stringify(upvotes));
		},
		removeUpvote: function (postId){
            var upvotes = JSON.parse(sessionStorage.getItem('upvotes'));
            console.log('upvotes before: ', upvotes);
            var index = upvotes.indexOf(postId);
            if (index > -1) {
                upvotes.splice(index, 1);
            }
            console.log('upvotes after: ', upvotes);
            sessionStorage.setItem('upvotes', JSON.stringify(upvotes));
		},
		addDownvote: function (postId){
            var downvotes = JSON.parse(sessionStorage.getItem('downvotes'));
            console.log('downvotes before: ', downvotes);
            downvotes.push(postId);
            console.log('downvotes after: ', downvotes);
            sessionStorage.setItem('downvotes', JSON.stringify(downvotes));

		},
        removeDownvote: function (postId){
            var downvotes = JSON.parse(sessionStorage.getItem('downvotes'));
            console.log('downvotes before: ', downvotes);
            var index = downvotes.indexOf(postId);
            if (index > -1) {
                downvotes.splice(index, 1);
            }
            console.log('downvotes after: ', downvotes);
            sessionStorage.setItem('downvotes', JSON.stringify(downvotes));

        }
	}
});