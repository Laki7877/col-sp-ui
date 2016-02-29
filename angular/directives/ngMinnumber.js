module.exports = function() {
	'ngInject';
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function(scope, element, attrs, ctrl) {
			if(!ctrl) return;
			var minnumber = undefined;

			attrs.$observe('ngMinnumber', function(val) {
				minnumber = val;
				ctrl.$validate();
			});

			ctrl.$validators.minnumber = function(modelValue, viewValue) {
				var value = modelValue || viewValue;
				if(_.isNil(value) || !value.match(/^[0-9]+(\.[0-9]{0,})?$/)) {
					return true;
				}
				return (!value) || (!minnumber) || (_.toNumber(value) >= _.toNumber(minnumber)) || false;
			};
		}
	}
}