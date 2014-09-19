// Definition of different Ajax requests
var app = angular.module('postStore');
//app.service('ajaxRequest', ['$http', function($http){
//    this.get = function(url){
//		 $http.get(url).success(function (response){
//	        this.posts = response;
//        })
//    };
//
//	this.post = function(url, data){
//		$http.post(url, data).success(function (response){
//			console.log(response);
//		})
//	};
//
//	this.update = function(url, postID, newComment){
//		$http.post(url, postID, newComment).success(function (response){
//			console.log(response);
//		})
//	};
//
//	this.remove = function(url, postIndex){
//		$http.delete(url, data).success(function (response){
//			console.log(response);
//		})
//	};
//}]);

app.service('ajaxRequest',['$http', function($http){
    this.get = function(url){
		 $http.get(url).success(function (response){
			 console.log('Response from get request: ' + response);
//			 response.serialize
//	         return response;
        })
    };

	this.post = function(url, data){
		$http.post(url, data).success(function (response){
			console.log(response);
		})
	};

	this.update = function(url, postID, newComment){
		console.log(url +' ' + postID + ' ' + newComment);
//		$http.post(url, postID, newComment).success(function (response){
		$http.post(url, {"id": postID }, {"newComment": newComment}).success(function (response){
			console.log(response);
		})
	};

	this.remove = function(url, postIndex){
		$http.delete(url, data).success(function (response){
			console.log(response);
		})
	};
}]);


// Does a service have to be exported as a module as well?