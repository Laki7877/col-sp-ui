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
				if(load) {
					ImageService.assignUploaderEvents(scope.uploader, scope.formData.BrandImages, 1, scope.customImageQueueHandler);
				} else {
					ImageService.assignUploaderEvents(scope.uploader, scope.formData.BrandImages, 1, scope.customImageQueueHandler);
				}
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
/*
module.exports = ['$scope', '$window', 'Image', 'Brand', 'Alert', function($scope, $window, ImageService, Brand, Alert) {
	$scope.edit = 0;
	$scope.uploader = ImageService.getUploader('/BrandImages', {
		queueLimit: 1
	});
	$scope.alert = new Alert();
	$scope.form = {};
	$scope.formData = {
		BrandImages: []
	};

	var customImageQueueHandler = function(images, item, obj) {
		item.remove();
		item.cancel();
		$scope.alert.error('Your brand cannot have more than 1 image');
		return false;
	};
	
	$scope.cancel= function() {
		$window.location.href = '/admin/brands';
	};

	$window.onbeforeunload = function (e) {

		if(!$scope.form.$dirty){
			//not dirty
			return null;
		}

		var message = "Your changes will not be saved.",
		e = e || window.event;
		// For IE and Firefox
		if (e) {
		  e.returnValue = message;
		}

		// For Safari
		return message;
	};

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

	$scope.init = function(params) {
		if(angular.isDefined(params) && angular.isDefined(params.id)) {
			$scope.edit = params.id;
			Brand.getOne(params.id).then(function(data) {
				$scope.formData = Brand.deserialize(data);
				ImageService.assignUploaderEvents($scope.uploader, $scope.formData.BrandImages, customImageQueueHandler);
			}, function(err) {
				$window.location.href = '/admin/brands';
			});
		} else {
			//Assign uploader images
			ImageService.assignUploaderEvents($scope.uploader, $scope.formData.BrandImages, customImageQueueHandler);
		}
	};

	$scope.cancel = function() {
		$window.location.href = '/admin/brands';
	}
	
	$scope.save = function() {
		if($scope.saving) {
			return;
		}

		if($scope.formData.BrandImages.length == 0) {
			$scope.alert.error('Your brand must have 1 image');
			return;
		}

		if($scope.uploader.isUploading) {
			$scope.alert.error('Please wait until the uploading is finished.');
			return;
		}

		$scope.form.$setSubmitted();
		if($scope.form.$invalid) {
			$scope.alert.error('Please fill out the required fields.');
			return;
		}

		$scope.alert.close();
		$scope.saving = true;
		$scope.formDataSerialized = Brand.serialize($scope.formData);
		if($scope.edit > 0) {
			Brand.update($scope.edit, $scope.formDataSerialized).then(function(res){
				$scope.alert.success('Your changes has been saved successfully. View <a href="/admin/brands">Brand List</a>');
				$scope.saving = false;
				$scope.form.$setPristine(true);
			}, function(err) {
				$scope.saving = false;
				$scope.alert.error('Unable to save because required fields are missing or incorrect.');
			});
		} else {
			Brand.publish($scope.formDataSerialized).then(function(res){
				$scope.alert.success('Your changes has been saved successfully. View <a href="/admin/brands">Brand List</a>');
				$scope.edit = res.BrandId;				
				$scope.saving = false;
				$scope.form.$setPristine(true);
			}, function(err) {
				$scope.saving = false;
				$scope.alert.error('Unable to save because required fields are missing or incorrect.');
			});
		}
	};
}];*/