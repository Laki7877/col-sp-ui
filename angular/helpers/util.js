var angular = require('angular');

module.exports = ['storage', function (storage) {
    'use strict';
    var service = {};

    service.variant = {};

    service.variant.hash = function(a,b){
	return (a.AttributeId + "-" + a.ValueEn.trim() + "-" + b.AttributeId + "-" + b.ValueEn.trim());
    };

    service.variant.toString = function(a,b){
	return (a.ValueEn.trim() + ", " + b.ValueEn.trim());	
    };

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
