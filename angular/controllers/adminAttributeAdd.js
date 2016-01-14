var angular = require('angular');

module.exports = ['$scope', '$window', 'Alert', 'Attribute', function($scope, $window, Alert, Attribute) {
	$scope.form = {};
	$scope.formData = {};
	$scope.alert = new Alert();
	$scope.dataTypeOptions = Attribute.dataTypeOptions;
	$scope.variantOptions = Attribute.variantOptions;
	$scope.boolOptions = Attribute.boolOptions;
	$scope.validationOptions = Attribute.validationOptions;
	$scope.formDataSerialized = {};
	$scope.edit = 0;

	/*(function () {
	    var location = $window.document.location;

	    var preventNavigation = function () {
	        var originalHashValue = location.hash;
	        
	        $window.setTimeout(function () {
	            location.hash = 'preventNavigation' + ~~ (9999 * Math.random());
	            location.hash = originalHashValue;
	        }, 0);

			$('#leave-page-warning').modal('show');
	    };
	    $window.addEventListener('beforeunload', preventNavigation, false);
	    $window.addEventListener('unload', preventNavigation, false);
	})();*/
	
	/*
	$window.onbeforeunload = function (e) {
		$('#leave-page-warning').modal('show');
		var message = "Your confirmation message goes here.",
		e = e || window.event;
		// For IE and Firefox
		if (e) {
		//  e.returnValue = message;
		}

		//e.preventDefault();
		// For Safari
		return message;
	};*/
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
	$scope.cancel= function() {
		$window.location.href = '/admin/attributes';
	};
	$scope.save = function() {
		if($scope.saving) {
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