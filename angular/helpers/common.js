module.exports = ['$http', '$q', 'storage', 'config', '$window', function ($http, $q, storage, config, $window) {
    'use strict';
        var service = {};
        service.makeRequest = function (options) {
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
			             var onLoginPage = ($window.location.pathname == "/login");
                        if(status == 401 && !onLoginPage){
                            //Catch Forbidden
                            console.log('redirecting to', $window.location.pathname);
                            storage.put('redirect', $window.location.pathname);
                            storage.clear();
                            
                            $window.location.href = "/login";
                        }
                        deferred.reject(data || {"error": "Unknown error"});
                    });
                return deferred.promise;
        };

        /**
         * Get error message from response
         */
        service.getError = function(response) {
            if(!_.isUndefined(response.message))
                return response.message;
            if(!_.isUndefined(response.error))
                return response.error;
            if(!_.isUndefined(response.Message))
                return response.Message;
            return response;
        };

        /**
         * Ahancer version of rest object..
         */
        service.Rest = function(resourceUri) {
            var obj = {};

            //Get one
            obj.get = function(id) {
                return service.makeRequest({
                    method: 'GET',
                    url: resourceUri + '/' + id
                });
            };

            //List unpaginated
            obj.listAll = function() {
                return service.makeRequest({
                    method: 'GET',
                    url: resourceUri
                });
            };

            //List paginated
            obj.list = function(params) {
                return service.makeRequest({
                    method: 'GET',
                    url: resourceUri,
                    params: params
                });
            };

            //Delete bulk
            obj.delete = function(array) {
                return service.makeRequest({
                    method: 'DELETE',
                    url: resourceUri,
                    data: array,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });
            };

            //Update
            obj.update = function(id, obj) {
                return service.makeRequest({
                    method: 'PUT',
                    url: resourceUri + '/' + id,
                    data: obj
                });
            };
            obj.updateAll = function(obj) {
                return service.makeRequest({
                    method: 'PUT',
                    url: resourceUri,
                    data: obj
                });
            };
            //Create
            obj.create = function(obj) {
                return service.makeRequest({
                    method: 'POST',
                    url: resourceUri,
                    data: obj
                });
            };

            //To be overrided
            obj.generate = function() {
                return {};
            };

            obj.serialize = function(data) {
                return data;
            };

            obj.deserialize = function(data) {
                return data;
            };

            //Extras
            obj.duplicate = function(id) {
                return service.makeRequest({
                    method: 'POST',
                    url: resourceUri + '/' + id
                });
            };
            obj.visible = function(obj) {
                return service.makeRequest({
                    method: 'PUT',
                    url: resourceUri + '/Visibility',
                    data: obj,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
                });
            };

            obj.advanceList = function(obj) {
                return service.makeRequest({
                    method: 'POST',
                    url: resourceUri + '/Search',
                    data: obj
                });
            };

            return obj;
        };
        
        return service;
}];
