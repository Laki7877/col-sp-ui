var angular = require('angular');

//TODO: maybe merge this with user service? (doesnt exist yet, but probably exists in ppon's local)
module.exports = ['common', function(common) {
    'use strict';

	var service = {};
	service.getPermissions = function(){
		return common.makeRequest({
			type: 'GET',
			url: '/Users/Login/'
		});
	}

	service.loginAs = function(Uid){
		return common.makeRequest({
			type: 'GET',
			url: '/Users/Login/' + Uid
		});
	}

	return service;
}];