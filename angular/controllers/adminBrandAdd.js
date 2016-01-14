var angular = require('angular');

module.exports = ['$scope', '$window', 'Image', 'Brand', function($scope, $window, ImageService, Brand) {
	$scope.uploader = ImageService.getUploader('/BrandImages', {
		queueLimit: 1
	});

	$scope.formData = {
		BrandImages: []
	};
	//Assign uploader images
	ImageService.assignUploaderEvents($scope.uploader, $scope.formData.BrandImages);
	
	$scope.cancel= function() {
		$window.location.href = '/admin/brands';
	};

	$scope.$on('delete', function(e, item, arr, indx){
		arr.splice(indx, 1)
	});

	$scope.init = function(params) {
		
	};
	
	$scope.save = function() {
		console.log("FormData", $scope.formData);
		Brand.publish($scope.formData).then(function(res){
			alert("Brand Added");
		});
	};
}];