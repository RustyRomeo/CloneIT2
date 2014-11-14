'use strict';

//***********************************************
// SESSION STORAGE SERVICE
//***********************************************

(function (){

    var app = angular.module('boah');

    app.service('sessionStore', function(){
        var userId = '';
        var items = '';

        return {
            addPost: function (postId){
                var posts = [];
                var postsJSON = sessionStorage.getItem('upvotes');
                if (postsJSON){
                    posts = JSON.parse(postsJSON);
                }
                posts.push(postId);
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
                var upvotes = [];
                var upvotesJSON = sessionStorage.getItem('upvotes');
                if (upvotesJSON){
                    upvotes = JSON.parse(upvotesJSON);
                }
                upvotes.push(postId);
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
                var downvotes = [];
                var downvotesJSON = sessionStorage.getItem('downvotes');
                if (downvotesJSON){
                    downvotes = JSON.parse(downvotesJSON);
                }

                downvotes.push(postId);
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

})();
