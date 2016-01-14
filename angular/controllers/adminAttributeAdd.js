var angular = require('angular');

module.exports = ['$scope', '$window', 'Alert', 'Attribute', function($scope, $window, Alert, Attribute) {
	$scope.form = {};
	$scope.formData = {};
	$scope.alert = new Alert();
	$scope.dataTypeOptions = Attribute.dataTypeOptions;
	$scope.boolOptions = Attribute.boolOptions;
	$scope.validationOptions = Attribute.validationOptions;
	$scope.edit = 0;
	$scope.formDataSerialized = '';

	$scope.init = function(params) {
		if(angular.isDefined(params)) {
			//edit mode
			$scope.edit = params.id;
			Attribute.get($scope.edit).then(function(data) {
				$scope.formData = Attribute.deserialize(data);
				console.log($scope.formData);
			});
		} else {
			//create mode!
			$scope.edit = 0;
			$scope.formData = Attribute.generate();
		}
	};
	$scope.save = function() {
		$scope.alert.close();
		//TODO: validate
		$scope.formDataSerialized = Attribute.serialize($scope.formData);
		if ($scope.edit) {
			Attribute.update($scope.edit, $scope.formDataSerialized).then(function(data) {
				$window.location.href = '/admin/attributes';
				$scope.alert.success();
			}, function(err) {
				$scope.alert.error(err);
			});
		}
		else {
			Attribute.create($scope.formDataSerialized).then(function(data) {
				$scope.alert.success();
			}, function(err) {
				$scope.alert.error(err);
				console.log(err);
			});
		}
	};
}];