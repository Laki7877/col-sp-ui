angular.module('nc')
.directive('ncPolicyAdmin', function($rootScope) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				  if(!_.get($rootScope.Profile, 'User.IsAdmin')){
				  		$(element).hide();
				  }
			}
		}
})
.directive('ncPolicyIndy', function($rootScope) {
		if(!$rootScope.ShopGroupPolicy('IN')){
			$(element).hide();
		}
})
.directive('ncPolicyBu', function($rootScope) {
		if(!$rootScope.ShopGroupPolicy('BU')){
			$(element).hide();
		}
})
.directive('ncPolicyIndyBu', function($rootScope) {
		if(!$rootScope.ShopGroupPolicy(['BU', 'IN'])){
			$(element).hide();
		}
})