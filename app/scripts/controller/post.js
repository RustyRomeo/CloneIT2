//***********************************************
// POST CONTROLLER
//***********************************************

(function() {

	var app = angular.module('boah').controller('PostController', ['$http', '$filter', 'ajaxRequest', 'filterFilter', 'sharedProperties', function ($http, $filter, ajaxRequest, filterFilter, sharedProperties) {
		var items = '';
		var self = this;

		// Getting the data via Ajax request the Angular way
		ajaxRequest.get('/posts', function (response) {

			response.forEach(function (entry) {
				if (entry.newpostclass) {
					entry.newpostclass = '';
				}
			});

			if (response) {
                $('#container').removeClass('hidden');
                $('#svg-container').fadeOut('fast');
				items = self.posts = response;
				sharedProperties.setItems(items);
				setTimeout(function () {
					$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
				}, 10);
			}
		});

		this.filter = function (filter, e) {
			e.preventDefault();
			this.posts = items;
			this.posts = filterFilter(this.posts, {tag: filter});
			setTimeout(function () {
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
			}, 10);
		};

		this.order = function (order, e) {
			e.preventDefault();
			if (order == 'date') {
				self.posts = $filter('orderBy')(self.posts, '-createdOn');
			} else {
				self.posts = $filter('orderBy')(self.posts, '-upvotes');
			}
			setTimeout(function () {
				$('#container').isotope('reloadItems').isotope({sortBy: 'original-order'});
			}, 10);
		};
	}]);

})();
