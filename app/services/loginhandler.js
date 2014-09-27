//***********************************************
// LOGIN HANDLER SERVICE
//***********************************************

var app = angular.module('postStore');

app.service('loginHandler',[ function (){
    this.correct = function(){
	    alert('Great job, correct login!')
    };

	this.wrong = function(){
	    alert('Try again, you can do better!')
	};

	this.notFound = function(){
	    alert('Sorry, no user found with this user name :(')

	};

	this.error = function(){

	};

	this.unknown = function(){

	};
}]);