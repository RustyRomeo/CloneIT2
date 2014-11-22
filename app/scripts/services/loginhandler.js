//***********************************************
// LOGIN HANDLER SERVICE
//***********************************************
(function (){

    var app = angular.module('boah');

    app.service('loginHandler',[ function (){
        this.correct = function(response){
            $('.header_logged-in').show(500);
            $('.header_logged-out').hide(500);
            $('.header_sign-up').hide(500);
            $('.welcome-msg').show(0).delay(3000).fadeOut(150);
            $('.big-nav').hide(500);
            $('.header-links').fadeOut(0);
        };

        this.taken = function (){
            $('.taken-msg').removeClass('hidden').fadeOut(0).fadeIn(250).delay(3000).fadeOut(1000);
        };

        this.wrong = function(){
            alert('Sorry, either username or password were incorrect. Try again!');
        };

        this.notFound = function(){
            alert('Sorry, either username or password were incorrect. Try again!')

        };

        this.error = function(){

        };

        this.unknown = function(){

        };
    }]);

})();
