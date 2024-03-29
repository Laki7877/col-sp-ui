// template for eye toggle
angular.module('nc')
	.directive('ncEye', function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				model: '=ncModel',
				callback: '&ncEyeOnToggle'
			},
			template: $templateCache.get('common/ncEye'),
			link: function(scope) {
				scope._toggle = function() {
					scope.model =!scope.model;
					scope.$eval(scope.callback);
				};
			}
		}
	});