module.exports = function(config, storage, FileUploader) {
	'ngInject';
	var service = {};
	service.getUploader = function(url, opt) {
		opt = opt || {};

		var accessToken = storage.getSessionToken();
		var options = angular.merge({
			url: config.REST_SERVICE_BASE_URL + url,
			autoUpload: false,
			headers: {
				Authorization: 'Bearer ' + accessToken
			}
		}, opt);
		var uploader = new FileUploader(options);
        return uploader;
	};
	return service;
};