module.exports = function($scope, $controller, AttributeService, ImageService, config, util) {
	'ngInject';
	$scope.dataTypeOptions = config.DROPDOWN.DATA_TYPE_DROPDOWN;
	$scope.variantOptions = config.DROPDOWN.VARIANT_DROPDOWN;
	$scope.boolOptions = config.DROPDOWN.YES_NO_DROPDOWN;
	$scope.validationOptions = config.DROPDOWN.VALIDATION_DROPDOWN;

	//Inherit from abstract ctrl
	$controller('AbstractAddCtrl', {
		$scope: $scope,
		options: {
			id: 'AttributeId',
			url: '/admin/attributes',
			item: 'Attribute',
			service: AttributeService,
			init: function(scope) {	}
		}
	});

	var uploader = ImageService.getUploader('/AttributeValueImages');
 		
 	//Brand image
 	$scope.upload = function($file, choice) {
 		console.log($file, choice);
 	};

	$scope.$watch('formData.DataType', function() {
		if($scope.formData.DataType == 'HB') {
			$scope.formData.VariantStatus = false;
		}
		if($scope.formData.DataType == 'LT') {
			$scope.variantOptions = config.DROPDOWN.VARIANT2_DROPDOWN;
		} else {
			$scope.variantOptions = config.DROPDOWN.VARIANT_DROPDOWN;
		}
	}, true);
};