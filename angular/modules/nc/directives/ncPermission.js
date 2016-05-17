angular.module('nc')
	.provider('ncPermissionProvider', function() {
		this.permission = function() {
			return [];
		};
		this.$get = function() {
			return this;
		};
	})
	.directive('ncClassPermission', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {

			}
		}
	})
	.directive('ncShowPermission', function() {
		
	});