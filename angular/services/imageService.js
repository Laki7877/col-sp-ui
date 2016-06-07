//Image Service
module.exports = function($q, $http, common, storage, config, FileUploader, Upload) {
  'ngInject';
  var service = {};

  //Upload by url
  service.upload = function(url, file, opts) {
    var accessToken = storage.getSessionToken();
    var options = {
      url: config.REST_SERVICE_BASE_URL + url,
      data: { file: file }
    };
    if(!_.isNil(accessToken)) {
      options.headers = {
        Authorization: 'Bearer ' + accessToken,
        Accept: 'application/json;charset=utf-8'
      };
    }
    return Upload.upload(_.merge(options, opts));
  };

  service.getUploaderFn = function(url, opts) {
    return {
      upload: function(file) {
        return service.upload(url, file, opts);
      }
    };
  }
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
      removeAfterUpload : true,
      filters: [{
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/ , options) {
          var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
          return '|jpg|png|jpeg|'.indexOf(type) !== -1;
        }
      }, {
        name: 'sizeFilter',
        fn: function(item /*{File|FileLikeObject}*/ , options) {
          return item.size <= config.MAX_IMAGE_UPLOAD_SIZE;
        }
      }]
    }, opt);
    
    var uploader = new FileUploader(options);

    return uploader;
  };

  /**
   * Assign image uploader events specifically to COL-image uploading feature
   */
  service.assignUploaderEvents = function(uploader, images, queueLimit, onFail, onValidation, onDoneItem) {

    uploader.onWhenAddingFileFailed = function(item, filter, options) {
      console.info('onAfterAddingFile', item, filter, options);
      onFail(item, filter);
    };
    uploader.onAfterAddingFile = function(item) {
      var obj = {
        Url: ''
      };
      if (images.length == uploader.queueLimit) {
        //Callback for queueLimit reached
        if (queueLimit) {
          //Block flow with custom handler
          if (!queueLimit(images, item, obj)) {
            return;
          }
        }
        //Default handle, pop last images
        images.pop();
      }
      images.push(obj);
      item.indx = images.length - 1;
      console.info('onAfterAddingFile', images, uploader.queue);
    };
    uploader.onSuccessItem = function(item, response, status, headers) {
      images[item.indx || 0] = response;
      console.info('onSuccessItem', images, uploader.queue);
	  if(onDoneItem) onDoneItem(images);
    };
    uploader.onErrorItem = function(item, response, status, headers) {
      images.splice(item.indx, 1);
      console.info('onErrorItem', images, uploader.queue, response);
			onFail(response);
    };

    uploader.onProgressItem = function(item, progress) {
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
