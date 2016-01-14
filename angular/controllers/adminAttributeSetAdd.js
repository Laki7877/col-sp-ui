var angular = require('angular');

module.exports = ['$scope', 'Alert', 'AttributeSet', 'Attribute', function($scope, Alert, AttributeSet, Attribute) {
	$scope.form = {};
	$scope.formData = {};
	$scope.tagOptions = [];
	$scope.alert = new Alert();
	$scope.edit = false;
	$scope.editId = 0;
	$scope.attributeOptions = [];
	$scope.visibleOptions = AttributeSet.visibleOptions;

	$scope.loadAttribute = function() {
		Attribute.getAll().then(function(data) {
			$scope.attributeOptions = data;
		});
	};
	$scope.init = function(params) {
		if(angular.isDefined(params)) {
			//edit mode
			$scope.edit = params.id;
			AttributeSet.get($scope.edit).then(function(data) {
				$scope.formData = AttributeSet.deserialize(data);
			});
		} else {
			//create mode!
			$scope.edit = false;
			$scope.formData = AttributeSet.generate();
		}
		$scope.loadAttribute();
	};
	$scope.save = function() {
		$scope.alert.close();
		//TODO: validate
		$scope.formDataSerialized = AttributeSet.serialize($scope.formData);
		if ($scope.edit) {
			AttributeSet.update($scope.edit, $scope.formDataSerialized).then(function(data) {
				$scope.alert.success();
			}, function(err) {
				$scope.alert.error(err);
				console.log(err);
			});
		}
		else {
			AttributeSet.create($scope.formData, $scope.formDataSerialized).then(function(data) {
				$scope.alert.success();
			}, function(err) {
				$scope.alert.error(err);
				console.log(err);
			});
		}
	};
}];