module.exports = function ($http, $q, storage, config, $window) {
    'ngInject';
        var service = {};

        service.makeCurl = function(method, url, token, body){
            var compiled = _.template("curl '<%= url %>' -X <%= method %> -H 'Pragma: no-cache' -H 'Content-Type: application/json;charset=UTF-8' -H 'Accept: application/json, text/plain, */*' -H 'Cache-Control: no-cache' -H 'Authorization: <%= token %>' -H 'Connection: keep-alive' --data-binary $'<%= body %>' --compressed");
            var str = compiled({ 'url': url, 'method': method, 'token': token, 'body': JSON.stringify(body) });
            return str;
        }


        service.makeRequest = function (options) {
                var deferred = $q.defer();
                var accessToken = storage.getSessionToken();
                if (!options.headers) {
                    options.headers = {};
                }

                if (accessToken && !options.headers.Authorization) {
                    options.headers.Authorization = 'Bearer ' + accessToken;
                }
                if (options.url.indexOf("http") !== 0) {
                    options.url = config.REST_SERVICE_BASE_URL + options.url;
                }

                
                var curlCmd = service.makeCurl(options.method, options.url, options.headers.Authorization, options.data);
                var counter = 1;
                var MAX_RETRY = 0;
                var request = function() {

                    $http(options)
                    .success(function (data) {
                        //IN production, remove this on-success
                        if(_.has(options, 'rollbar')){
                            Rollbar.log(options.rollbar, {
                                'curl': curlCmd
                            });
                        }

                        deferred.resolve(data);
                    })
                    .error(function (data, status, headers, config) {

                        if(counter > MAX_RETRY || status == 404){
                            //Don't retry on 404
                            console.warn('HTTP Request Error', status, config.method, config.url, data);
                            var onLoginPage = ($window.location.pathname == "/login");
                            if(status == 401 && !onLoginPage){
                                //Catch Forbidden
                                storage.put('redirect', $window.location.pathname);
                                storage.put('session_timeout');
                                storage.clear();
                                
                                // $window.location.href = "/login";
                                console.log("failed")
                            }

                            if(status == 403 && !onLoginPage) {
                                storage.put('redirect', $window.location.pathname);
                                storage.put('access_denied');
                                storage.clear();
                                
                                $window.location.href = "/login";
                            }


                            if(_.has(options, 'rollbar')){
                                Rollbar.error(options.rollbar, {
                                    'curl': curlCmd
                                });
                            }

                            deferred.reject(data || {"error": "Unknown error"});
                        }else{
                            console.log("Got", status, "Retrying..", counter);
                            counter++;
                            request();
                        }
                        
                    });

                }

                request();

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
                    data: obj,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    }
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

        //Get sort by table
        service.getSortBy = function() {
            return service.makeRequest({
                url: '/SortBy',
                method: 'GET'
            });
        }
        
        return service;
};
