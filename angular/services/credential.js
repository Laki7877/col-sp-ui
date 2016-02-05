var angular = require('angular');

//TODO: maybe merge this with user service? (doesnt exist yet, but probably exists in poon's local)
module.exports = ['common', '$base64', 'storage', '$q', function(common, $base64, storage, $q) {
    'use strict';

	var service = {};

	service.login = function(user, pass, remember){
		var deferred = $q.defer();
		storage.storeSessionToken($base64.encode(user + ":" + pass));
		common.makeRequest({
			type: 'GET',
			url: '/Users/Login/'
		}).then(function(r){
			storage.storeCurrentUserProfile(r, remember || false);
			deferred.resolve(r);
		}, deferred.reject);

		return deferred.promise;
	};

	service.loginAs = function(User){
		var deferred = $q.defer();
	 	common.makeRequest({
			type: 'GET',
			url: '/Users/Admin/Login/' + User.UserId
		}).then(function(r){
			storage.storeCurrentUserProfile(r, false);
			storage.storeImposterProfile(User);
			deferred.resolve(r);
		}, deferred.reject);

		return deferred.promise;
	};

	service.logoutAs = function(){
		var deferred = $q.defer();
		common.makeRequest({
			type: 'GET',
			url: '/Users/Admin/LogoutAs'
		}).then(function(r){
			//TODO: actually this needs to know whether its overriding local or session storage
			storage.storeCurrentUserProfile(r, false);
		}, deferred.reject);

		return deferred.promise;
	};

	return service;
}];