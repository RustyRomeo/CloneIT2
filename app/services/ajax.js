//***********************************************
// AJAX REQUEST SERVICES
//***********************************************

var app = angular.module('postStore');

app.service('ajaxRequest',['$http','loginHandler', function($http, loginHandler){
    this.get = function(url, callback){

		 return $http.get(url).success(function (response){
			 var responseFromGet = '';
			 callback(response);
        })
    };

	this.post = function(url, data, callback){
		$http.post(url, data).success(function (response){
			console.log('RESPONSE: ',response);

			if(response.username){
				loginHandler.correct(response);
				console.log(response);
				callback(response);
			}
			else if(response[0] === 'user-added-successfully'){
				loginHandler.correct(response);
				callback(response);
			}
			else if(response[0] === 'already-taken'){
				loginHandler.taken(response);
				callback(response);
			}
			switch(response) {
				case "wrong":
					loginHandler.wrong();
					break;
				case "not-found":
					loginHandler.notFound();
					break;
				case "error":
					loginHandler.error();
					break;
				case "unknown":
					loginHandler.unknown();
					break;
			}
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