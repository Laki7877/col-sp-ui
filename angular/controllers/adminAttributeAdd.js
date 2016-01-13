var angular = require('angular');

module.exports = ['$scope', 'Alert', 'Attribute', function($scope, Alert, Attribute) {
	$scope.form = {};
	$scope.formData = {};
	$scope.alert = new Alert();
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
	$scope.boolOptions = [
		{
			name: 'No',
			value: false
		},
		{
			name: 'Yes',
			value: true
		}
	];
	$scope.validationOptions = [
		{
			name: 'No Validation',
			value: 'NO'
		},
		{
			name: 'Number Only',
			value: 'NUM'
		},
		{
			name: 'Text Only',
			value: 'TXT'
		},
		{
			name: 'Email Address',
			value: 'EML'
		},
		{
			name: 'Phone Number',
			value: 'PHO'
		}
	];
	$scope.edit = false;
	$scope.editId = 0;

	$scope.init = function(params) {
		if(angular.isDefined(params)) {
			//edit mode
			$scope.edit = true;
			$scope.editId = params.id;
			Attribute.get($scope.editId).then(function(data) {
				console.log(data);
			});
		} else {
			//create mode!
			$scope.edit = false;
			$scope.formData = Attribute.generate();
			console.log($scope.formData);
		}
	}
	$scope.save = function() {
		$scope.alert.close();
		if ($scope.edit) {
			//Attribute.update($scope.formData)
		}
		else {
			var formData = Attribute.create($scope.formData).then(function(data) {
				$scope.alert.success();
			}, function(err) {
				$scope.alert.error(err);
			});
		}
	}
}];