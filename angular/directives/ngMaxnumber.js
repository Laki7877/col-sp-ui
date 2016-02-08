module.exports = function() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			if(!ctrl) return;
			var maxnumber = undefined;

			attrs.$observe('ngMaxnumber', function(val) {
				maxnumber = val;
				ctrl.$validate();
			});

			ctrl.$validators.maxnumber = function(modelValue, viewValue) {
				var value = modelValue || viewValue;
				return (!value) || (!maxnumber) || (parseInt(value) <= parseInt(maxnumber)) || false;
			};
		}
	}
}