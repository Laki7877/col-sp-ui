angular.module('nc')
	.directive('ncTagTest', function() {
		return {
			require: 'ngModel',
			link: function(scope, elem, attrs, modelCtrl) {
				modelCtrl.$parsers.push(function(value) {
					console.log('parsers', value);
					return value;
				});
				modelCtrl.$formatters.push(function(value) {
					console.log('formatters', value);
					return value;
				});
				modelCtrl.$validators.test = function(model, view) {
					console.log('validator', model, view);
					return false;
				};
			}
		};
	});