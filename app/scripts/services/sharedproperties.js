'use strict';

//***********************************************
// SHARED PROPERTIES SERVICE
//***********************************************

var app = angular.module('cloneIT');

app.service('sharedProperties', function(){
	var userId = '';
	var items = '';
	console.log('userId im sharedOptions Service: ', userId);
	console.log('items im sharedOptions Service: ', items);

	return {
		getUserId: function (){
			return userId;
		},
		setUserId: function (value){
			userId = value;
			console.log('Neue userId: ', userId);
		},
		getItems: function (){
			return items;
		},
		setItems: function (value){
			items = value;
			console.log('Neue items: ', items);
		},
		addItem: function (value){
			items.unshift(value);
			console.log('Neue items nach unshift: ', items);
		}
	}
});


//app.service('sharedProperties', function(){
//	var userId = '';
//	var items = '';
//
//
//		this.getUserId = function (){
//			return userId;
//		};
//
//		this.setUserId = function (value){
//			userId = value;
//		};
//
//		this.getItems =  function (){
//			return items;
//		};
//
//		this.setItems = function (value){
//			items = value;
//		};
//});