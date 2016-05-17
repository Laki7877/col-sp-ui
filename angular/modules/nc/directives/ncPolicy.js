angular.module('nc')
	.directive('ncPolicyAdmin', function ($rootScope) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				if (!_.get($rootScope.Profile, 'User.IsAdmin')) {
					$(element).hide();
				}
			}
		}
	})
	.directive('ncPolicyIndy', function ($rootScope) {

		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				if (_.get($rootScope.Profile, 'User.IsAdmin')) {
					return;
				}
				if (!$rootScope.ShopGroupPolicy('IN')) {
					$(element).hide();
				}
			}
		}
	})
	.directive('ncPolicyBu', function ($rootScope) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				if (_.get($rootScope.Profile, 'User.IsAdmin')) {
					return;
				}
				if (!$rootScope.ShopGroupPolicy('BU')) {
					$(element).hide();
				}
			}
		}
	})
	.directive('ncPolicyIndyBu', function ($rootScope) {
		return {
			restrict: 'A',
			link: function (scope, element, attrs) {
				if (_.get($rootScope.Profile, 'User.IsAdmin')) {
					return;
				}
				if (!$rootScope.ShopGroupPolicy(['BU', 'IN'])) {
					$(element).hide();
				}
			}
		}
	})
	.directive('ncPolicyPermit', function ($rootScope) {
		return {
			restrict: 'A',
			scope: {
				permId: '@ncPolicyPermit'
			},
			link: function (scope, element, attrs) {
				if (_.get($rootScope.Profile, 'User.IsAdmin')) {
					return;
				}
				console.log('scope.permId', scope.permId);
				var k = !$rootScope.permit(Number(scope.permId));
				if (k) {
					$(element).prop("disabled", true);
				}
			}
		}
	});