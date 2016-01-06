var angular = require('angular');
//Image Service
module.exports = ['$q', '$http', 'common', 'storage', 'config', 'FileUploader', function($q, $http, common, storage, config, FileUploader){
	'use strict';
	var service = {};

	/**
	 * Get image uploader
	 */
	service.getUploader = function(url, opt) {
		opt = opt || {};

		var accessToken = storage.getSessionToken();
		var options = angular.merge({
			url: config.REST_SERVICE_BASE_URL + url,
			autoUpload: true,
			headers: {
				Authorization: 'Basic ' + accessToken
			},
			queueLimit: 10,
			filters: [{
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }}]
		}, opt);
		var uploader = new FileUploader(options);

        return uploader;
	}

	/**
	 * Get all images
	 */
	service.getAll = function() {
		common.makeRequest({

		});
	}

	return service;
}];
