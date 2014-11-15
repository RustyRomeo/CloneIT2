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


//***********************************************
// GENERAL POST DELETION HANDLER
//***********************************************

    $container.on('click', 'a.icon-close', function (e){
        $(e.currentTarget).closest('.item').fadeOut(50);
    });


//***********************************************
// TAB NAVIGATION
//***********************************************

    $('.sorting-item').on('click', function (e){
        $('.sorting-item').removeClass('active');
        $(e.currentTarget).addClass('active');
    });

    $('.filter-item').on('click', function (e){
        $('.filter-item').removeClass('active');
        $(e.currentTarget).addClass('active');
    });

})(jQuery);
