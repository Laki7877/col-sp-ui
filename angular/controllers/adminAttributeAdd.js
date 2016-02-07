var angular = require('angular');

module.exports = function($scope, $controller, AttributeService, config) {
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
};