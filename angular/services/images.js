//Image Service
module.exports = ['$q', '$http', 'common', 'storage', 'config', 'FileUploader', function($q, $http, common, storage, config, FileUploader){
	var service = {};

	/**
	 * Get image uploader
	 */
	service.getUploader = function(url) {
		var accessToken = storage.getSessionToken();
		var uploader = new FileUploader({
			url: config.REST_SERVICE_BASE_URL + url,
			autoUpload: true,
			headers: {
				Authorization: 'Basic ' + accessToken
			},
			filters: []
		});

		uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        return uploader;
	}

	return service;
}];
