//***********************************************
// AJAX REQUEST SERVICES
//***********************************************

var app = angular.module('postStore');

app.service('ajaxRequest',['$http', function($http){
    this.get = function(url){
		 $http.get(url).success(function (response){
			 var responseFromGet = response;
			 console.log('Response from get request: ');
			 console.log(responseFromGet);
	         return responseFromGet;
        })
    };

	this.post = function(url, data){
		$http.post(url, data).success(function (response){
		})
	};

	this.update = function(url, postID, newComment){
		console.log(url +' ' + postID + ' ' + newComment);
		$http.post(url, {"id": postID,"newComment": newComment}).success(function (response){
			console.log('Response from the other side: ');
			console.log(response);
		})
	};

	this.remove = function(url, postID, newComment){
		console.log('postId: ');
		console.log(postID);
		$http.delete(url + postID ).success(function (response){
			console.log(response);
		})
	};
}]);