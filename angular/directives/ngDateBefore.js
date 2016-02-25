module.exports = function() {
	'ngInject';
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			if(!ctrl) return;
			var dateBefore = undefined;

			attrs.$observe('ngDateBefore', function(val) {
				dateBefore = val;
				ctrl.$validate();
			});

			var datify = function(value) {
				if(value instanceof Date) {
					return value;
				} else if(_.isString(value)){
					return new Date(value);
				} 
				return null;
			};

			ctrl.$validators.datebefore = function(modelValue, viewValue) {
				var value = modelValue || viewValue;
				var a = datify(value);
				var b = datify(dateBefore);
				return (!_.isNil(a)) || (!_.isNil(b)) || (a <= b) || false;
			};
		}
	}
}