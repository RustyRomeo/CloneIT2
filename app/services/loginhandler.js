//***********************************************
// LOGIN HANDLER SERVICE
//***********************************************

var app = angular.module('postStore');

app.service('loginHandler',[ function (){
    this.correct = function(){
	    $('.header_logged-in').show(500);
	    $('.header_logged-out').hide(500);
	    $('.welcome-msg').delay(3000).fadeOut(150);
	    $('.big-nav').delay(3000).toggle(500);
    };

	this.wrong = function(){
	    alert('Try again, you can do better!');
	};

	this.notFound = function(){
	    alert('Sorry, no user found with this user name :(')

	};

	this.error = function(){

	};

	this.unknown = function(){

	};
}]);