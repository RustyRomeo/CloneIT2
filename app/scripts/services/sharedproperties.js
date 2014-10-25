'use strict';

//***********************************************
// SHARED PROPERTIES SERVICE
//***********************************************

var app = angular.module('cloneIT');

app.service('sharedProperties', function(){
	var userId = '';
	var items = '';

	return {
		getUserId: function (){
			return userId;
		},
		setUserId: function (value){
			userId = value;
		},
		getItems: function (){
			return items;
		},
		setItems: function (value){
			items = value;
		},
		addItem: function (value){
			items.unshift(value);
		}
	}
});
