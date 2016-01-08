module.exports = ['storage', function (storage) {
    'use strict';
    var service = {};

    /**
     * Function to check if any user is currently logged in
     */
    service.isLoggedIn = function () {
        var profile = storage.getCurrentUserProfile();
        var sessionToken = storage.getSessionToken();
        return !!(profile && sessionToken);
    };

    service.isFreeTextDataType = function(dataType){
	return (dataType == "ST");
    };

    service.isListDataType = function(dataType){
	return (dataType == "LT");
    }


    return service;
}];
