module.exports = function ($cookies) {
    'ngInject';
    var service = {};

    /**
     * Cross-page data sharing cache methods 
     * using sessions and local storage as the medium.
     */
    service.get = function(key) {
        var obj = sessionStorage.getItem('central.seller.portal.shared.' + key);
        if(_.isUndefined(obj)) {
            obj = localStorage.getItem('central.seller.portal.shared.' + key);
        }
        return obj;
    };

    service.put = function(key, obj, flag) {
        //Always use local storage
        flag = true;
        sessionStorage.setItem('central.seller.portal.shared.' + key, obj);
        if (flag) {
            localStorage.setItem('central.seller.portal.shared.' + key, obj);
        }
    };

    service.remove = function(key) {
        sessionStorage.removeItem('central.seller.portal.shared.' + key);
        localStorage.removeItem('central.seller.portal.shared.' + key);
    };

    service.has = function(key) {
        return !_.isUndefined(service.get(key));
    };

    /**
     * Returns the stored sessionToken
     * This method first checks in sessionStorage if sessionToken is not found in sessionStorage
     * this method checks in localStorage, if sessionToken still not found in localStorage,
     * then it will return null or undefined
     * The controllers has to implement the logic that if sessionToken is null/undefined then user is not authorized
     */
    service.getSessionToken = function () {
        // var token = sessionStorage.getItem('central.seller.portal.auth.token');
        // if (!token) {
        //     token = localStorage.getItem('central.seller.portal.auth.token');
        // }
        var token = $cookies.get('central.seller.portal.auth.token');
        return token;
    };
    /**
     * Store the session token in sessionStorage
     * A boolean flag is passed which when true indicate that user chose remember me option and data should
     * also be stored in localStorage
     */
    service.storeSessionToken = function (sessionToken, flag) {
        // sessionStorage.setItem('central.seller.portal.auth.token', sessionToken);
        // if (flag) {
        //     localStorage.setItem('central.seller.portal.auth.token', sessionToken);
        // }
        $cookies.put('central.seller.portal.auth.token', sessionToken);
    };

    /**
     * Get current user profile stored in sessionStorage or localStorage
     */
    service.getCurrentUserProfile = function () {
        var profile = sessionStorage.getItem('central.seller.portal.auth.profile');
        if (!profile) {
            profile = localStorage.getItem('central.seller.portal.auth.profile');
        }
        return angular.fromJson(profile);
    };

    /**
     * Store the current user profile in sessionStorage
     * A boolean flag is passed which when true indicate that user chose remember me option and data
     * should also be stored in localStorage
     */
    service.storeCurrentUserProfile = function (profile, flag) {
        profile = angular.toJson(profile);
        sessionStorage.setItem('central.seller.portal.auth.profile', profile);
        if (flag) {
            localStorage.setItem('central.seller.portal.auth.profile', profile);
        }
    };

    service.storeImposterProfile = function(profile){
	    profile = angular.toJson(profile);
        sessionStorage.setItem('central.seller.portal.auth.imposter', profile);
    };
	
    service.getImposterProfile = function () {
        var profile = sessionStorage.getItem('central.seller.portal.auth.imposter');
        return angular.fromJson(profile);
    };
    
    service.clearImposterProfile = function () {
         sessionStorage.removeItem('central.seller.portal.auth.imposter');
    };

    /**
     * Utility method to clear the sessionStorage
     */
    service.clear = function () {
        sessionStorage.removeItem('central.seller.portal.auth.token');
        sessionStorage.removeItem('central.seller.portal.auth.profile');
        $cookies.remove('central.seller.portal.auth.token');
        $cookies.remove('central.seller.portal.auth.profile');
	    sessionStorage.removeItem('central.seller.portal.auth.imposter');
        localStorage.removeItem('central.seller.portal.auth.actions');
        localStorage.removeItem('central.seller.portal.auth.profile');
    };

    return service;
};
