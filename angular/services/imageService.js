//Image Service
module.exports = function($q, $http, common, storage, config, FileUploader){
	'ngInject';
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
	                return '|jpg|png|jpeg|'.indexOf(type) !== -1;
	            }},
	            {
	            name: 'sizeFilter',
	            fn: function(item /*{File|FileLikeObject}*/, options) {
	                return item.size <= config.MAX_IMAGE_UPLOAD_SIZE;
	            }},]
		}, opt);
		var uploader = new FileUploader(options);

        return uploader;
	};

	/**
	 * Assign image uploader events specifically to COL-image uploading feature
	 */
	service.assignUploaderEvents = function(uploader, images, queueLimit, onFail, onValidation) {

		uploader.onWhenAddingFileFailed = function(item, filter, options) {
			console.info('onAfterAddingFile', item, filter, options);
			onFail(item, filter);
		};
		uploader.onAfterAddingFile = function(item) {
			var obj = {
				url: ''
			};
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
			console.info('onAfterAddingFile', images, uploader.queue);
		};
	    uploader.onSuccessItem = function(item, response, status, headers) {
	    	images[item.indx] = response;
			console.info('onSuccessItem', images, uploader.queue);
	    };
	    uploader.onErrorItem = function(item, response, status, headers) {
	    	images.splice(item.indx, 1);
			console.info('onErrorItem', images, uploader.queue);
	    };

        uploader.onProgressItem = function(item,progress){
             console.info('onProgressItem', item, progress, item.progress);
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
};
