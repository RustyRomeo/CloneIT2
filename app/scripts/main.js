'use strict';

(function( $ ) {


//***********************************************
// EVENT HANDLERS
//***********************************************
	$(document).ready(function () {

//		CHANGE THEME
		$('.salmon').on('click', function (e) {
			e.preventDefault();
			setActiveStyleSheet('default');
		});
		$('.usa').on('click', function (e) {
			e.preventDefault();
			setActiveStyleSheet('usa');
		});
		$('.marine').on('click', function (e) {
			e.preventDefault();
			setActiveStyleSheet('marine');
		});
	});


//***********************************************
// ISOTOPE LAYOUT - Initialization
//***********************************************

	var $container = $('#container');
	// init
	$container.isotope({
		itemSelector: '.item',
		masonry: {
			columnWidth: '.masonry-width'
		}
	});


})(jQuery);
