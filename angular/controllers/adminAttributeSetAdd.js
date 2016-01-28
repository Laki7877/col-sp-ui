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
	$scope.test = function(i) {
		return angular.isUndefined(i.ProductCount) || (i.ProductCount == 0);
	};

	$window.onbeforeunload = function (e) {
		if(!$scope.form.$dirty){
			//not dirty
			return null;
		}

		var message = "Your changes will not be saved.",
		e = e || window.event;
		// For IE and Firefox
		if (e) {
		  e.returnValue = message;
		}

		// For Safari
		return message;
	};
	
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
				console.log($scope.formData);
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
		
		$scope.form.$setSubmitted();
		if($scope.form.$invalid) {
			$scope.alert.error('Please fill out the required fields.');
			return;
		}

		$scope.alert.close();
		$scope.formDataSerialized = AttributeSet.serialize($scope.formData);
		if ($scope.edit) {
			$scope.saving = true;
			AttributeSet.update($scope.edit, $scope.formDataSerialized).then(function(data) {
				$scope.alert.success('Your changes has been saved successfully. View <a href="/admin/attributesets">Attribute Set List</a>');
				$scope.saving = false;
				$scope.form.$setPristine(true);
			}, function(err) {
				$scope.saving = false;
				$scope.alert.error('Unable to save because required fields are missing or incorrect.');
			});
		}
		else {
			$scope.saving = true;
			AttributeSet.create($scope.formDataSerialized).then(function(data) {
				$scope.alert.success('Your changes has been saved successfully. View <a href="/admin/attributesets">Attribute Set List</a>');
				$scope.edit = data.AttributeSetId;				
				$scope.saving = false;
				$scope.form.$setPristine(true);
			}, function(err) {
				$scope.saving = false;
				$scope.alert.error('Unable to save because required fields are missing or incorrect.');
			});
		}
	};
}];