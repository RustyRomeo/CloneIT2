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
		$http.post(url, {"id": postID }, {"newComment": newComment}).success(function (response){
			console.log('Response from the other side: ');
			console.log(response);
		})
	};

	this.remove = function(url, postId){
		console.log(postId);
		$http.delete(url, {"id": postId}).success(function (response){
			console.log(response);
		})
	};
}]);