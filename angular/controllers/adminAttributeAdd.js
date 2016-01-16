var angular = require('angular');

module.exports = ['$scope', '$window', 'Alert', 'Attribute', 'Blocker', function($scope, $window, Alert, Attribute, Blocker) {
	$scope.form = {};
	$scope.formData = {};
	$scope.alert = new Alert();
	$scope.dataTypeOptions = Attribute.dataTypeOptions;
	$scope.variantOptions = Attribute.variantOptions;
	$scope.boolOptions = Attribute.boolOptions;
	$scope.validationOptions = Attribute.validationOptions;
	$scope.formDataSerialized = {};
	$scope.edit = 0;

	//Block normal href flow
	

	$scope.init = function(params) {
		if(angular.isDefined(params)) {
			//edit mode
			$scope.edit = params.id;
			Attribute.get($scope.edit).then(function(data) {
				$scope.formData = Attribute.deserialize(data);
			});
		} else {
			//create mode!
			$scope.edit = 0;
			$scope.formData = Attribute.generate();
		}
	};
	$scope.cancel= function(location) {
		if(angular.isDefined(location)) {
			$window.location.href = location.href;
		} else {
			$window.location.href = '/admin/attributes';
		}
	};
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
		$scope.formDataSerialized = Attribute.serialize($scope.formData);
		if ($scope.edit) {
			$scope.saving = true;
			Attribute.update($scope.edit, $scope.formDataSerialized).then(function(data) {
				$scope.saving = false;
				$('#success').submit();
			}, function(err) {
				$scope.saving = false;
				
				$scope.alert.error(err);
			});
		}
		else {
			$scope.saving = true;
			Attribute.create($scope.formDataSerialized).then(function(data) {
				$scope.saving = false;
				$('#success').submit();
			}, function(err) {
				$scope.saving = false;
				
				$scope.alert.error(err);
				console.log(err);
			});
		}
	};
}];