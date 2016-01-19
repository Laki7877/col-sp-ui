var angular = require('angular');

module.exports = ['storage', function (storage) {
    'use strict';
    var service = {};

    service.variant = {};

    service.variant.hash = function(a,b){
        if(!("ValueEn" in a) || a.ValueEn) return "[API Error]";
        if(!('ValueEn' in b) || b.ValueEn) return  (a.AttributeId + "-" + a.ValueEn.trim() + "-" + "null" + "-" );
	    return (a.AttributeId + "-" + a.ValueEn.trim() + "-" + b.AttributeId + "-" + b.ValueEn.trim());
    };

    service.variant.toString = function(a,b){
        if(!("ValueEn" in a) || !a.ValueEn) return "[API Error]";
        if(!('ValueEn' in b) || !b.ValueEn) return a.ValueEn.trim();
	    return (a.ValueEn.trim() + (b.ValueEn == '' ? '' : (", " + b.ValueEn.trim())));	
    };

    service.uniqueSet = function(a, prop){
        var seen = new Set();
        return a.filter(function(x) {
            var y = x;
            if(prop) y = x[prop];
            return !seen.has(y) && seen.add(y);
        })
    };

    service.nullOrUndefined = function(a){
        return angular.isUndefined(a) || a === null;
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
    };

    service.tableSortClass = function($scope) {
        return function(id, flag) {

            if(flag) {
                return $scope.tableParams.orderBy == id ? 'active-underline' : '';
            }

            var classes = ['fa'];
            if($scope.tableParams.orderBy == id) {
                if($scope.tableParams.direction == 'desc') {
                    classes.push('fa-caret-down');
                } else {
                    classes.push('fa-caret-up');
                }
            } else {
                classes.push('fa-caret-down');
                classes.push('color-grey');
            }
            return classes;
        }
    };
    service.getCheckedArray = function(arr) {
        return arr.filter(function(elem) {
            return angular.isDefined(elem.checked) && elem.checked;
        });
    };
    return service;
}];
