var angular = require('angular');

module.exports = function($scope, $controller, AttributeService, config, util) {
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
 
	$scope.$watch('formData.DataType', function() {
		if(_.isUndefined($scope.formData.DataType)) return;
		if($scope.formData.DataType.value == 'HB') {
			$scope.formData.VariantStatus = $scope.boolOptions[0];
		}
	}, true);
};