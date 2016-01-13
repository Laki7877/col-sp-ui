var angular = require('angular');

module.exports = ['$scope', 'Attribute', function($scope, Attribute) {
	$scope.form = {};
	$scope.formData = {};
	$scope.dataTypeOptions = [
		{
			name: 'Free Text',
			value: 'ST'
		},
		{
			name: 'Dropdown',
			value: 'LS'
		},
		{
			name: 'HTML Box',
			value: 'HB'
		}
	];
	$scope.edit = false;
	$scope.init = function(params) {
		if(angular.isDefined(params.id)) {
			//edit mode
			$scope.edit = true;
		} else {
			//create mode!
			$scope.edit = false;
		}
	}
}];