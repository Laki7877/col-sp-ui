var angular = require('angular');

module.exports = ['$scope', 'Alert', 'AttributeSet', 'Attribute','$window', function($scope, Alert, AttributeSet, Attribute, $window) {
	$scope.form = {};
	$scope.formData = {};
	$scope.tagOptions = [];
	$scope.alert = new Alert();
	$scope.attributeOptions = [];
	$scope.visibleOptions = AttributeSet.visibleOptions;
	$scope.formDataSerialized = {};
	$scope.edit = 0;
	$scope.saving = false;

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
			$scope.edit = 0;
			$scope.formData = AttributeSet.generate();
		}
		$scope.loadAttribute();
	};
	$scope.cancel= function() {
		$window.location.href = '/admin/attributesets';
	};
	$scope.save = function() {
		if($scope.saving) {
			return;
		}
		$scope.alert.close();
		$scope.formDataSerialized = AttributeSet.serialize($scope.formData);
		if ($scope.edit) {
			$scope.saving = true;
			AttributeSet.update($scope.edit, $scope.formDataSerialized).then(function(data) {
				$scope.saving = false;
				$('#success').submit();
			}, function(err) {
				$scope.saving = false;
				$scope.alert.error(err);
			});
		}
		else {
			$scope.saving = true;
			AttributeSet.create($scope.formDataSerialized).then(function(data) {
				$scope.saving = false;
				$('#success').submit();
			}, function(err) {
				$scope.saving = false;
				$scope.alert.error(err);
			});
		}
	};
}];