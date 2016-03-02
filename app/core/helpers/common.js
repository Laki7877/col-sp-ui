/**
 * Handle all common http related functions
 *
 * @version 1.0.0
 * @author ahancer
 * @copyright Copyright © 2016 COL Public Company Limited. All Rights Reserved.
 */
'use strict';
angular.module('colsp.core')
	.provider('common', function () {
		var vm = this;
		this.makeRequestErrorHandler = _.noop;
		this.$get = function ($http, $q, $window, storage, config) {
			'ngInject';
			var service = {
				/**
				 * Make $http request to REST API endpoint
				 * API base url fetched defined in config.js
				 *
				 * @method     makeRequest
				 * @param      {Object}  options  override $http() options
				 * @return     {Promise}  $q promise
				 */
				makeRequest: function (options) {
					var deferred = $q.defer();
					var accessToken = storage.getSessionToken();
					if(!options.headers) {
						options.headers = {};
					}
					if (accessToken && !options.headers.Authorization) {
	                    options.headers.Authorization = 'Basic ' + accessToken;
	                }
	                if (options.url.indexOf("http") !== 0) {
	                    options.url = config.REST_SERVICE_BASE_URL + options.url;
	                }
	                $http(options)
	                    .success(function (data) {
	                        deferred.resolve(data);
	                    })
	                    .error(function (data, status, headers, config) {
	                        if (config.DEBUG_API) {
	                        	console.warn(status, config.method, config.url, data);
				            }
				            vm.makeRequestErrorHandler(data, status, headers, config);
	                        deferred.reject(data || {"error": "Unknown error"});
	                    });
	                return deferred.promise;
				},
				/**
				 * Get error message
				 *
				 * @method     getError
				 * @param      {Object|string}  response  API error response
				 * @return     {string}  error message
				 */
				getError: function(response) {
		            if(!_.isUndefined(response.message))
		                return response.message;
		            if(!_.isUndefined(response.error))
		                return response.error;
		            if(!_.isUndefined(response.Message))
		                return response.Message;
		            return response;
				},
				/**
				 * Define commonly used resource methods
				 * 
				 * 	List of supported REST methods:
				 * 	- get(id)
				 * 	- list(params)
				 * 	- delete([id])
				 * 	- update(id, object)
				 * 	- create(object)
				 * 	
				 * 	List of supported extended-REST methods:
				 * 	- duplicate(id)
				 * 	- visible([{id, Visibility}])
				 * 	- advanceList(params)
				 * 	
				 * 	List of should-override serialization methods:
				 * 	- generate()
				 * 	- serialize(model)
				 * 	- deserialize(raw_json)
				 *
				 * @version     1.0.0
				 * @method     createRestObject
				 * @param      {string}  resourceUri  { description }
				 * @return     {Object}  { description_of_the_return_value }
				 */
				makeRestObject: function(resourceUri) {
		            return {
		            	/**
		            	 * Get single resource by resource id
		            	 *
		            	 * @method     get
		            	 * @param      {string|number}  id      resource id
		            	 * @return     {Promise}  $q promise with single resource object
		            	 */
		            	get: function(id) {
			                return service.makeRequest({
			                    method: 'GET',
			                    url: resourceUri + '/' + id
			                });
			            },
			            /**
			             * List all resources by parameter criteria
			             *
			             * @method     list
			             * @param      {Object}  params  custom endpoint parameters
			             * @return     {Promise}  $q promise with Array|Object of resources
			             */
			            list: function(params) {
			                return service.makeRequest({
			                    method: 'GET',
			                    url: resourceUri,
			                    params: params
			                });
			            },
			            /**
			             * Delete all resources by resource id
			             *
			             * @method     delete
			             * @param      {Array}  array   array of resource object with id
			             * @return     {Promise}  $q promise
			             */
			            delete: function(array) {
			                return service.makeRequest({
			                    method: 'DELETE',
			                    url: resourceUri,
			                    data: array,
			                    headers: {
			                        'Content-Type': 'application/json;charset=UTF-8'
			                    }
			                });
			            },
			            /**
			             * Update one resource by resource id
			             *
			             * @method     update
			             * @param      {string|number}  id      resource id
			             * @param      {Object}  obj     updated resource object
			             * @return     {Promise}  $q promise with updated resource
			             */
			            update: function(id, obj) {
			                return service.makeRequest({
			                    method: 'PUT',
			                    url: resourceUri + '/' + id,
			                    data: obj
			                });
			            },
			            /**
			             * Create new resource
			             *
			             * @method     create
			             * @param      {Object}  obj     new resource object
			             * @return     {Promise}  $q promise with newly created resource
			             */
			            create: function(obj) {
			                return service.makeRequest({
			                    method: 'POST',
			                    url: resourceUri,
			                    data: obj
			                });
			            },
			            /**
			             * Generate empty resource object
			             * 
			             * Should be overrided
			             *
			             * @method     generate
			             * @return     {Object}  empty resource
			             */
						generate: function() {
							//TODO: override generate()
			                return {};
			            },
			            /**
			             * Serialize user-defined form object structure into queryable resource structure
			             *
			             * Should be overrided
			             *
			             * @method     serialize
			             * @param      {Object}  data    object with user-defined structure
			             * @return     {Object}  resource object
			             */
			            serialize: function(data) {
			            	//TODO: override serialize(data)
			                return data;
			            },
			            /**
			             * Deserialize resource structure into user-defined form object
			             *
			             * Should be overrided
			             *
			             * @method     deserialize
			             * @param      {Object}  data    resource object
			             * @return     {Object}  object with user-defined structure
			             */
			            deserialize: function(data) {
			            	//TODO: override deserialize(data)
			                return data;
			            },
			            /**
			             * Duplicate resource by resource id
			             *
			             * @method     duplicate
			             * @param      {string|number}  resource id      
			             * @return     {Object}  duplicated resource object
			             */
			            duplicate: function(id) {
			                return service.makeRequest({
			                    method: 'POST',
			                    url: resourceUri + '/' + id
			                });
			            },
			            /**
			             * Set visibility of list of resources
			             *
			             * @method     visible
			             * @param      {Array}  array	Array of resource object
			             * @return     {Array}	Array of updated resource objects  
			             */
			            visible: function(array) {
			                return service.makeRequest({
			                    method: 'PUT',
			                    url: resourceUri + '/Visibility',
			                    data: array,
			                    headers: {
			                        'Content-Type': 'application/json;charset=UTF-8'
			                    }
			                });
			            },
			            /**
			             * List all resources by advance paramter criteria (POST object)
			             *
			             * @method     advanceList
			             * @param      {Object}  obj     advance parameters
			             * @return     {Object}  Object with list of resources and meta data
			             */
			            advanceList: function(obj) {
			                return service.makeRequest({
			                    method: 'POST',
			                    url: resourceUri + '/Search',
			                    data: obj
			                });
			            }
			        }
				}
			};
			return service;
		};
	});