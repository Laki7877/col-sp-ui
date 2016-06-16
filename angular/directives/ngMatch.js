/**
 * validate if ngmodel equal ngMatch
 */
module.exports = function($interpolate) {
	'ngInject';
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			if(!ctrl) return;
			var match = undefined;

			attrs.$observe('ngMatch', function(val) {
				match = val;
				ctrl.$validate();
			});

			ctrl.$validators.match = function(modelValue, viewValue) {
				var value = modelValue || viewValue;
				return (!match) || (value === match);
			};
		}
	}
}