'use strict';


module.exports = ['$http', '$q', '$log', 'storage', 'config', 
        function ($http, $q, $log, storage, config) {
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
                            $log.error(status, config.method, config.url, data);
                            deferred.reject(data || {"error": "Unknown error"});
                        });
                    return deferred.promise;
                }
            };
        }];