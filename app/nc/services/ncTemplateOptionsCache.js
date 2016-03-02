/**
 * Store template options as cache object
 *
 * @version 1.0.0
 * @author ahancer
 * @copyright Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
angular.module('nc')
	.factory('$templateOptionsCache', function() {
		var cache = {};
		return {
			putAll: function(object) {
				_.forOwn(object, function(v, k)) {
					cache[k] = v;
				}
			},
			put: function(key, json) {
				cache[key] = json;
			},
			get: function(key, json) {
				return cache[key];
			}
		};
	});