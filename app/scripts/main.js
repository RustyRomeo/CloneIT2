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

//***********************************************
// HEADER MANIPULATION
//***********************************************

    $('.more-options').on('click', function (){
        $('.header-links').slideToggle(300);
    });

//***********************************************
// FILTERS TOGGLING
//***********************************************
    $('.filter-toggle').on('click', function (){
        $('#filters').slideToggle(300);
        var $filterToggle = $('.filter-toggle-link');
        if($filterToggle.text() == '+ FILTERS'){
            $filterToggle.text('– FILTERS');
        }

        else {
            $filterToggle.text('+ FILTERS');
        }
    });

    $(window).on('resize', function (){
        var viewportWidth = $(window).width();
        if(viewportWidth >= 639){
            $('#filters').show(0);
        }
    });

})(jQuery);
