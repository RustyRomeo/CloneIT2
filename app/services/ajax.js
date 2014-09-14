// Definition of different Ajax requests
app.service('ajaxRequest', function(){
    this.get = function(url){
		 $http.get(url).success(function (response){
	        this.posts = response;
        })
    };

	this.post = function(url, data){
		$http.post(url, data).success(function (response){
			console.log(response);
		})
	};

	this.update = function(url, postID, newComment){
		$http.post(url, postID, newComment).success(function (response){
			console.log(response);
		})
	};

	this.remove = function(url, postIndex){
		$http.delete(url, data).success(function (response){
			console.log(response);
		})
	};

});


// Does a service have to be exported as a module as well?