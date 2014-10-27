//***********************************************
// LOGIN HANDLER SERVICE
//***********************************************

var app = angular.module('cloneIT');

app.service('loginHandler',[ function (){
    this.correct = function(response){
	    $('.header_logged-in').show(500);
	    $('.header_logged-out').hide(500);
	    $('.header_sign-up').hide(500);
	    $('.welcome-msg').show(0).delay(3000).fadeOut(150);
	    $('.big-nav').delay(3000).hide(500);
    };

	this.taken = function (){
		$('.taken-msg').removeClass('hidden').fadeOut(0).fadeIn(250).delay(3000).fadeOut(1000);
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
