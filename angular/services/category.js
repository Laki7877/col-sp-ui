/**
 * Util class for category
 * @author poonwu
 */
var angular = require('angular');

module.exports = ['config', function(config) {
    'use strict';
	var service = {};

    /**
     * Convert array of object with Depth to Nested array of object
     * Used in category
     */
    service.convertDepthArrayToNestedArray = function(depthArray) {
        //Create nested object from raw data
        var create = function(data) {
            var array = [];
            angular.forEach(data, function(item) {
                insert(item.Depth, item, array);
            });
            return array;
        };
        //Internal insert to create object
        var insert = function(depth, obj, array) {
            var parent = depth - 1;
            var ptr = array;
            var ptrToParent = null;
            for (var i = 0; i < parent; i++) {
                ptrToParent = ptr[ptr.length - 1];
                ptr = angular.isUndefined(ptrToParent.children) ? (ptrToParent.children = []) : ptrToParent.children;
            }
            obj.parent = ptrToParent;
            ptr.push(obj);
        };        
        return create(depthArray);
    };

    /**
     * Create selection function for ng-click 
     * select in category columns 
     * **can only be used with NestedArray
     */
    service.createSelectFunc = function(columns, selectEvent) {
    	return function(item, indx, parentIndx) {
			columns[parentIndx].active = indx;

			for (var i = parentIndx+1; i < columns.length; i++) {
				columns[i].active = -1;
				columns[i].list = [];
			};
			
			if (parentIndx+1 < columns.length) {
				columns[parentIndx+1].list = item.children || [];
				columns[parentIndx+1].active = -1;
			}

			if (angular.isUndefined(item.children)) {
				selectEvent(item);
			} else {
                selectEvent(null);
			}
		};
    };

    /**
     * Create array of column from item in template or blank
     */
    service.createColumns = function(item) {
        var array = [];
        for (var i = 0; i < config.MAX_GLOBAL_CAT_COLUMN; i++) {
            array.push({
                active: -1,
                list: []
            })
        }

        if(angular.isDefined(catId) && item != null) {
            var parent = item.parent;
            for (var i = item.Depth - 1; i >= 0; i--) {
                array[i].list = parent.children;
                array[i].active = array[i].list.indexOf(item);
                parent = parent.parent;
            }
        }
        return array;
    };

    /**
     * Search tree for catId
     */
    
    service.findByCatId = function(catId, tmp) {
        if(angular.isArray(tmp)) {
            
            //Init
            var search = [];
            for (var t in tmp) {
                search.push(t);
            }

            //Recursion
            while(search.length > 0) {
                var head = search.pop();
                if(head.CategoryId == catId)
                    return head;
                if(angular.isDefined(head.children)) {
                    for (var j in head.children) {
                        search.push(j);
                    }
                }
            }
        }
        return null;
    };

    return service;
}];