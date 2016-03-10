module.exports = function() {
	'ngInject';
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
				var regex = new RegExp('^[0-9]+(\.[0-9]{0,})?$');
				if(_.isNil(value) || !regex.test(value)) {
					return true;
				}
				return (!value) || (!maxnumber) || (_.toNumber(value) <= _.toNumber(maxnumber)) || false;
			};
		}
	}
}