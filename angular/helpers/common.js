module.exports = ['$http', '$q', 'storage', 'config', function ($http, $q, storage, config) {
    'use strict';
        return {
            /**
             * Make an http request and add access token
             * @param {Object} options the options for $http call
             * @returns {Promise} promise
             */
            makeRequest: function (options) {
                var deferred = $q.defer();
                var accessToken = storage.getSessionToken();
                if (!options.headers) {
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
                        console.warn(status, config.method, config.url, data);
                        deferred.reject(data || {"error": "Unknown error"});
                    });
                return deferred.promise;
            },

            /**
             * Get error message from response
             */
            getError: function(response) {
                if(response.message)
                    return response.message;
                if(response.error)
                    return response.error;
                return response;
            }
        };
}];
