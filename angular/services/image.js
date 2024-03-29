var angular = require('angular');
//Image Service
//Note: this file is not used anywhere (legacy!!! dOnt edit )
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
				Authorization: 'Bearer ' + accessToken
			},
			queueLimit: 10,
			filters: [{
	            name: 'imageFilter',
	            fn: function(item /*{File|FileLikeObject}*/, options) {
	            	console.log('item', item);
	                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
	                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
	            }}]
		}, opt);
		var uploader = new FileUploader(options);

        return uploader;
	};

	/**
	 * Assign image uploader events specifically to COL-image uploading feature
	 */
	service.assignUploaderEvents = function(uploader, images, queueLimit, onFail) {
		uploader.onWhenAddingFileFailed = function(item, filter, options) {
			onFail(item, filter);
		};
		uploader.onAfterAddingFile = function(item) {
			var obj = { Url: '' };
			if(images.length == uploader.queueLimit) {
				//Callback for queueLimit reached
				if(queueLimit) {
					//Block flow with custom handler
					if(!queueLimit(images, item, obj)) {
						return;
					}
				}
				//Default handle, pop last images
				images.pop();
			}
			images.push(obj);
			item.indx = images.length-1;
		};
	    uploader.onSuccessItem = function(item, response, status, headers) {
	    	images[item.indx] = response;
	    };
	    uploader.onErrorItem = function(item, response, status, headers) {
	    	images.splice(item.indx, 1);
	    };

        uploader.onProgressItem = function(item,progress){
        };

        uploader.onProgressAll = function(){
        };

	    return uploader;
	}

	/**
	 * Get all images
	 */
	service.getAll = function() {
		common.makeRequest({

		});
	};

	service.shift = function(from, to) {
		common.makeRequest({

		});
	};

	return service;
}];
