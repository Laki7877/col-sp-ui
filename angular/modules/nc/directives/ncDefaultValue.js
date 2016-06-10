// create default value for model
angular.module('nc')
	.directive('ncDefaultValue', function() {
		return {
			restrict: 'A',
            scope: {
                ngModel: '=ngModel',
                defaultValue: '&ncDefaultValue'
            },
			link: function(scope, element, attrs) {
                if(scope.ngModel){
                    return;
                }
                scope.ngModel = scope.defaultValue();
			}
		};
	});