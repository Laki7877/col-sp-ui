var angular = require('angular');

module.exports = ['storage', 'config', '$window', function (storage, config, $window) {
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

    //Convert ncTable params to our older params version
    service.ncParams = function(param) {
        return {
            orderBy: param._order,
            pageSize: param._limit,
            direction: param._direction,
            filter: param._filter,
            searchText: param.searchText
        };
    };

    //Generate Success message for add-<stuff> pages
    service.saveAlertError = function() {
        return config.DEFAULT_ERROR_MESSAGE;
    };
    service.saveAlertSuccess = function(itemName, link) {
        return config.DEFAULT_SUCCESS_MESSAGE + ' View <a href="' + link + '">' + itemName + ' List</a>';
    };


    //Create bulk-action from template
    service.bulkDelete = function(rest, id, item, alert, reload)  {
        return function(array, cb) {
            alert.close();

            //Only pass ShopId
            var array = _.map(array, function(e) { 
                return _.pick(e, [id]); 
            });

            //Blank array?
            if(array.length <= 0) {
                alert.error('Unable to delete. Please select ' + item + ' for this action.');
                return;
            }

            //Delete bulk
            rest.delete(array)
                .then(function() {
                    alert.success('Delete successful.');
                    cb();
                }, function(err) {
                    alert.error('Unable to delete. Please select ' + item + ' for this action.');
                })
                .finally(reload);
        };
    } ;

    //Create action from template
    service.actionView = function(uri, id) {
        return function(item) {
            $window.location.href= uri + item[id];
        };
    };

    //Create action from template
    service.actionDelete = function(rest, id, item, alert, reload, cb)  {
        return function(obj) {
            alert.close();

            //Only pass id
            var obj = _.pick(obj, [id]); 
           

            //Delete bulk
            rest.delete([obj])
                .then(function() {
                    alert.success('Delete successful.');
                    cb(obj, id);
                }, function(err) {
                    alert.error('Unable to delete. Please select ' + item + ' for this action.');
                })
                .finally(reload);
        };
    } ;

    //Map value to dropdown name&value
    service.getDropdownItem = function(array, value) {
        return array.find(function(element) {
            if (element.value === value) {
                return true;
            }
            return false;
        });
    };
    return service;
}];
