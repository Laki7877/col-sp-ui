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
				var regex = new RegExp('^[0-9]+(\.[0-9]{0,})?$');
				if(_.isNil(value) || !regex.test(value)) {
					return true;
				}
				return (!value) || (!minnumber) || (_.toNumber(value) >= _.toNumber(minnumber)) || false;
			};
		}
	}
}