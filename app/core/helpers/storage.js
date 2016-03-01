/**
 * Handle storing data for cross-browser access
 *
 * @version 1.0.0
 * @author ahancer
 * @copyright Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
angular.module('colsp.core')
	.factory('storage', function ($cookies){
		return {
			/**
			 * Get custom object by key
			 *
			 * @method     get
			 * @param      {string}  key     hash key
			 * @return     {Object}  custom stored object
			 */
			get: function(key) {
				return $cookies.getObject('central.seller.portal.shared.' + key);
			},
			/**
			 * Store custom object by key
			 *
			 * @method     put
			 * @param      {string}  key     hash key
			 * @param      {Object}  object  stored object
			 */
			put: function(key, object) {
				$cookies.putObject('central.seller.portal.shared.' + key, object);
			},
			/**
			 * Check for key existence
			 *
			 * @method     has
			 * @param      {string}   key     hash key
			 * @return     {boolean}  if key exist
			 */
			has: function(key) {
	        	return !_.isUndefined(this.get(key));
			},
			/**
			 * Remove custom object by key
			 *
			 * @method     remove
			 * @param      {string}  key     hash key
			 */
			remove: function(key) {
				$cookies.remove('central.seller.portal.shared.' + key);
			},
			/**
			 * Get stored authorization token
			 *
			 * @method     getSessionToken
			 * @return     {string}  auth token
			 */
			getSessionToken: function() {
				return $cookies.get('central.seller.portal.auth.token');
			},
			/**
			 * Store authorization token
			 *
			 * @method     storeSessionToken
			 * @param      {string}  token   auth token
			 */
			storeSessionToken: function(token) {
				$cookies.put('central.seller.portal.auth.token', token);
			},
			/**
			 * Get current user profile
			 *
			 * @method     getCurrentUserProfile
			 * @return     {Object}  user object
			 */
			getCurrentUserProfile: function() {
				return $cookies.getObject('central.seller.portal.auth.profile');
			},
			/**
			 * Store user profile
			 *
			 * @method     storeCurrentUserProfile
			 * @param      {Object}  profile  user object
			 */
			storeCurrentUserProfile: function(profile) {
				$cookies.putObject('central.seller.portal.auth.profile', profile);
			}
		};
});