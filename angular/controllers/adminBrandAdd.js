var angular = require('angular');

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
	
	$scope.cancel= function() {
		$window.location.href = '/admin/brands';
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

	$scope.init = function(params) {
		if(angular.isDefined(params) && angular.isDefined(params.id)) {
			$scope.edit = params.id;
			Brand.getOne(params.id).then(function(data) {
				$scope.formData = Brand.deserialize(data);
				ImageService.assignUploaderEvents($scope.uploader, $scope.formData.BrandImages);
			}, function(err) {
				$window.location.href = '/admin/brands';
			});
		} else {
			//Assign uploader images
			ImageService.assignUploaderEvents($scope.uploader, $scope.formData.BrandImages);
		}
	};

	$scope.cancel = function() {
		$window.location.href = '/admin/brands';
	}
	
	$scope.save = function() {
		if($scope.saving) {
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
				$scope.saving = false;
				$('#success').submit();		
			}, function(err) {
				$scope.saving = false;
				$scope.alert.error(err);
			});
		} else {
			Brand.publish($scope.formDataSerialized).then(function(res){			
				$scope.saving = false;
				$('#success').submit();		
			}, function(err) {
				$scope.saving = false;
				$scope.alert.error(err);
			});
		}
	};
}];