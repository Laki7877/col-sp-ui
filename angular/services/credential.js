//TODO: maybe merge this with user service? (doesnt exist yet, but probably exists in poon's local)
module.exports = ['common', '$base64', 'storage', '$q', '$rootScope', function(common, $base64, storage, $q, $rootScope) {
    'use strict';

	var service = {};

    service.changePassword = function(object){
    	return common.makeRequest({
    		url: '/Users/ChangePassword',
    		method: 'PUT',
    		data: object
    	});
    };

    service.getRedirPath = function(profile){
        if(profile.User.IsAdmin === true){
            return '/admin'
        }
        return '/products'
    }

	service.login = function(user, pass, remember){
		var deferred = $q.defer();
		storage.storeSessionToken($base64.encode(user + ":" + pass), true);
		common.makeRequest({
			type: 'GET',
			url: '/Users/Login/'
		}).then(function(r){
			storage.storeCurrentUserProfile(r, true);
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
			storage.storeCurrentUserProfile(r, true);
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
            storage.clearImposterProfile();
			storage.storeCurrentUserProfile(r, true);
            deferred.resolve(r);
		}, deferred.reject);

		return deferred.promise;
	};
    
    service.logout = function(){
		storage.clear();
	};

	return service;
}];

