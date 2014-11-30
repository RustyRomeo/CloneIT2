//***********************************************
// POST CONTROLLER
//***********************************************

(function() {

	var app = angular.module('boah').controller('PostController', ['$http', '$filter', 'ajaxRequest', 'filterFilter', 'sharedProperties', function ($http, $filter, ajaxRequest, filterFilter, sharedProperties) {
		var items = '';
		var self = this;

		// Getting the data via Ajax request the Angular way
		ajaxRequest.get('/posts', function (response) {

			if (response) {
                response.forEach(function (entry) {
                    if (entry.newpostclass) {
                        entry.newpostclass = '';
                    }
			    });

                // Hiding the preloader and displaying the fetched items
                $('#container').removeClass('hidden');
                $('#svg-container').fadeOut('fast');
				items = self.posts = response;
				sharedProperties.setItems(items);

				setTimeout(function () {
					$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
				}, 1000);

                // Making sure the posts are properly laid out also in case of slow connection
				setTimeout(function () {
					$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
				}, 6000);

                // And very slow connections - nothing happens if already the correct layout is present
				setTimeout(function () {
					$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
				}, 10000);
			}
		});

        // Reload the data on websocket notification
        $(document).ready(function () {
            $('.fetch-posts').on('click', function () {

                ajaxRequest.get('/posts', function (response) {

                    if (response) {
                        response.forEach(function (entry) {
                            if (entry.newpostclass) {
                                entry.newpostclass = '';
                            }
                        });
                        items = self.posts = response;
                        sharedProperties.setItems(items);
                        setTimeout(function () {
                            $('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
                        }, 10);
                        $('.websocket-msg').hide('slow');
                    }
                });
            });
        });

		this.filter = function (filter, e) {
			e.preventDefault();
			this.posts = items;
			this.posts = filterFilter(this.posts, {tag: filter});
            var isLoggedIn = $('.not-logged-in').length < 1;
            if(isLoggedIn){
                setTimeout(function () {
				    $('.new-form').removeClass('hidden');
			    }, 10);
            }
			setTimeout(function () {
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
			}, 10);
		};

		this.order = function (order, e) {
			e.preventDefault();
            items = sharedProperties.getItems();

			if (order == 'date') {
				items = $filter('orderBy')(items, '-createdOn');
                this.posts = items;
			}

            else {
				items = $filter('orderBy')(items, '-upvotes');
                this.posts = items;
			}

			setTimeout(function () {
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
			}, 100);
		};

        this.mylinks = function (e) {
            e.preventDefault();
            var ownPosts = JSON.parse(sessionStorage.getItem('posts'));
            var myItems = [];

            // Check which of my posts correspond with the items array and save those to myItems array
            items.forEach(function (entry) {
                if (ownPosts.indexOf(entry._id) > -1 ) {
                    myItems.push(entry);
                }
            });
            self.posts = myItems;

            setTimeout(function () {
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
			}, 100);
        };

        this.myupvotes = function (e) {
            e.preventDefault();
            var ownPosts = JSON.parse(sessionStorage.getItem('upvotes'));
            var myUpvotes = [];

            // Check which of my upvoted posts correspond with the items array and save those to myUpvotes array
            items.forEach(function (entry) {
                if (ownPosts.indexOf(entry._id) > -1 ) {
                    myUpvotes.push(entry);
                }
            });
            self.posts = myUpvotes;

            setTimeout(function () {
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
			}, 100);
        };

        this.mydownvotes = function (e) {
            e.preventDefault();
            var ownPosts = JSON.parse(sessionStorage.getItem('downvotes'));
            var myDownvotes = [];

            // Check which of my downvoted posts correspond with the items array and save those to myDownvotes array
            items.forEach(function (entry) {
                if (ownPosts.indexOf(entry._id) > -1 ) {
                    myDownvotes.push(entry);
                }
            });
            self.posts = myDownvotes;

            setTimeout(function () {
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
			}, 100);
        };
	}]);

})();
