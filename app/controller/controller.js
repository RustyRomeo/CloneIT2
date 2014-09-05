(function() {
    var app = angular.module('postStore',[]);

    app.controller('PostController', function($scope){
        this.posts = items;
        $scope.erase = function (e) {
            $(e.currentTarget).closest('.post').hide(200, function () {
                $('#container').isotope('remove', e.currentTarget).isotope('reloadItems').isotope({sortBy: 'original-order'});
            });
        };
        $scope.voteup = function (e) {
            post.upvotes += 1;
            }
    });


    var items = [
        {
            id: 1,
            title: "Poroshenko announces accord on cease-fire in eastern Ukraine",
            url: "http://tagi.ch",
            imgurl: "images/bunny.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 2,
            title: "Another brick in the wall or wall?",
            url: "http://tagi.ch",
            imgurl: "images/husky.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 3,
            title: "The tourists may be well-intentioned. But that doesn’t mean the photos they’re taking of the Mashco-Piro people in a Peruvian forest, near the Brazilian border, are a good idea.",
            url: "http://tagi.ch",
            imgurl: "images/panther.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 4,
            title: "Hiring slows in August as U.S. adds 142K jobs",
            url: "http://tagi.ch",
            imgurl: "images/bunny.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 5,
            title: "Poroshenko announces accord on cease-fire in eastern Ukraine",
            url: "http://tagi.ch",
            imgurl: "images/husky.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 6,
            title: "Another brick in the wall or wall?",
            url: "http://tagi.ch",
            imgurl: "images/panther.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 7,
            title: "somewhat crazy",
            url: "http://tagi.ch",
            imgurl: "images/bunny.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },
            
        {
            id: 8,
            title: "Hiring slows in August as U.S. adds 142K jobs",
            url: "http://tagi.ch",
            imgurl: "images/husky.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 9,
            title: "Another brick in the wall or wall?",
            url: "http://tagi.ch",
            imgurl: "images/panther.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 10,
            title: "Another brick in the wall or wall?",
            url: "http://tagi.ch",
            imgurl: "images/bunny.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 11,
            title: "Poroshenko announces accord on cease-fire in eastern Ukraine",
            url: "http://tagi.ch",
            imgurl: "images/husky.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 12,
            title: "Another brick in the wall or wall?",
            url: "http://tagi.ch",
            imgurl: "images/panther.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 13,
            title: "The tourists may be well-intentioned. But that doesn’t mean the photos they’re taking of the Mashco-Piro people in a Peruvian forest, near the Brazilian border, are a good idea.",
            url: "http://tagi.ch",
            imgurl: "images/bunny.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 14,
            title: "Hiring slows in August as U.S. adds 142K jobs",
            url: "http://tagi.ch",
            imgurl: "images/husky.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 15,
            title: "The tourists may be well-intentioned. But that doesn’t mean the photos they’re taking of the Mashco-Piro people in a Peruvian forest, near the Brazilian border, are a good idea.",
            url: "http://tagi.ch",
            imgurl: "images/panther.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 16,
            title: "Another brick in the wall or wall?",
            url: "http://tagi.ch",
            imgurl: "images/bunny.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 17,
            title: "Poroshenko announces accord on cease-fire in eastern Ukraine",
            url: "http://tagi.ch",
            imgurl: "images/husky.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        },

        {
            id: 18,
            title: "Hiring slows in August as U.S. adds 142K jobs",
            url: "http://tagi.ch",
            imgurl: "images/panther.png",
            upvotes: 0,
            downvotes: 0,
            createdOn: 1397490980837,
            comments: [
                "You think this is funny?",
                "To be honest I think it's hillarious!",
                "I'm rather indifferent about all that. Don't think it's of any relevance at all."
            ]
        }
];

})();