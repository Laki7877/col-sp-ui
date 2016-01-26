angular.module('app')
	.service('common', function($http, $q, $log, storage, config) {
		this.makeRequest = function(options) {
	        var deferred = $q.defer();
	        var accessToken = storage.getSessionToken();
	        if (!options.headers) {
	            options.headers = {};
	        }

	        //Attach auth token
	        if (accessToken && !options.headers.Authorization) {
	            options.headers.Authorization = 'Basic ' + accessToken;
	        }

	        //This is a relative api url
	        if (options.url.indexOf("http") !== 0) {
	            options.url = config.REST_SERVICE_BASE_URL + options.url;
	        }

	        $http(options)
	            .success(function (data) {
	                deferred.resolve(data);
	            })
	            .error(function (data, status, headers, config) {
	                $log.error(status, config.method, config.url, data);
	                deferred.reject(data || {"error": "Unknown error"});
	            });
	        return deferred.promise;
		};
	})