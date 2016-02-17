module.exports = function($scope, $controller, BrandService, ImageService) {
	'ngInject';
	//Inherit from abstract ctrl
	$scope.uploader = ImageService.getUploader('/BrandImages', {
		queueLimit: 1
	});

	$scope.customImageQueueHandler = function(images, item, obj) {
		item.remove();
		item.cancel();
		$scope.alert.error('Your brand cannot have more than 1 image');
		return false;
	};
	$scope.onFail = function() {
		$scope.alert.error('Error uploading your image, please try again');
	};

	//Events
	$scope.$on('delete', function(e, item, arr, indx, uploader){
		angular.forEach(uploader.queue, function(i) {
			if(i.indx == indx) {
				i.remove();
				i.cancel();
			}
		});
		arr.splice(indx, 1);
	});
   	$scope.$on('zoom', function(evt, item, array, index) {
   		//Should use angular way, but ok whatever
        $('#product-image-zoom img').attr('src', item.url);
        $('#product-image-zoom').modal('show');
   	});
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'BrandId',
			url: '/admin/brands',
			item: 'Brand',
			service: BrandService,
			onLoad: function(scope, load) {
				ImageService.assignUploaderEvents(scope.uploader, scope.formData.BrandImages, scope.customImageQueueHandler, scope.onFail);
			},
			onSave: function(scope) {
				if(scope.formData.BrandImages.length == 0) {
					scope.alert.error('Your brand must have 1 image');
					return true;
				}
				if(scope.uploader.isUploading) {
					scope.alert.error('Please wait until the uploading is finished.');
					return true;
				}
				return false;
			}
		}
	});
};
