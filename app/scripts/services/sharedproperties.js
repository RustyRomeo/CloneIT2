'use strict';

//***********************************************
// SHARED PROPERTIES SERVICE
//***********************************************

(function (){

    var app = angular.module('boah');

    // This is our central store for variables that are used in many different places
    app.service('sharedProperties', function(){
        var userId = '';
        var items = '';

        return {
            getUserId: function (){
                return userId;
            },

            setUserId: function (value){
                userId = value;
            },

            getItems: function (){
                return items;
            },

            setItems: function (value){
                items = value;
            },

            addItem: function (value){
                items.unshift(value);
            },

            getSessionPosts: function (){
               return JSON.parse(sessionStorage.posts);
            },

            getSessionUpvotes: function (){
                if (sessionStorage.upvotes){
                    return JSON.parse(sessionStorage.upvotes);
                }

                else {
                    return [];
                }
            },

            getSessionDownvotes: function (){
                if (sessionStorage.downvotes){
                    return JSON.parse(sessionStorage.downvotes);
                }

                else {
                    return [];
                }
            }
        }
    });

})();
