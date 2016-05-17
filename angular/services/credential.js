//TODO: maybe merge this with user service? (doesnt exist yet, but probably exists in poon's local)
module.exports = function(common, $base64, storage, $q, $rootScope) {
    'ngInject';

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
        } else {
        	if(profile.Shop) {
        		return profile.Shop.Status == 'AT' ? '/dashboard' : '/onboarding';
        	} else {
        		return '/products';
        	}
        }
    };

	service.login = function(user, pass, admin){
		var deferred = $q.defer();
		common.makeRequest({
			method: 'POST',
			url: '/Users/Login',
			data: {
				Email: user,
				Password: pass,
				IsAdmin: admin || false
			}
		}).then(function(r){
			storage.storeCurrentUserProfile(r, true);
			storage.storeSessionToken(r.User.Token, true);
			deferred.resolve(r);
		}, deferred.reject);

		return deferred.promise;
	};

	service.checkToken = function() {
		return common.makeRequest({
			method: 'GET',
			url: '/Tokens/Validation'
		});
	};
	service.loginWithToken = function(token, remember) {
		var deferred = $q.defer(); 
		storage.storeSessionToken(token, true);
		common.makeRequest({
			method: 'GET',
			url: '/Users/Profile'
		}).then(function(r){
			storage.storeCurrentUserProfile(r, true);
			deferred.resolve(r);
		}, deferred.reject);
		return deferred.promise;
	};

	service.loginAs= function(User){
		var deferred = $q.defer();
	 	common.makeRequest({
			method: 'GET',
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
			method: 'GET',
			url: '/Users/Admin/LogoutAs'
		}).then(function(r){
            storage.clearImposterProfile();
			storage.storeCurrentUserProfile(r, true);
            deferred.resolve(r);
		}, deferred.reject);

		return deferred.promise;
	};
    
    service.logout = function(){
		var deferred = $q.defer();
		common.makeRequest({
			method: 'GET',
			url: '/Users/Logout'
		}).then(function(r){
			storage.clear();
            deferred.resolve(r);
		}, function() {
			storage.clear();
			deferred.reject(r);
		});

		return deferred.promise;
	};

	return service;
};
