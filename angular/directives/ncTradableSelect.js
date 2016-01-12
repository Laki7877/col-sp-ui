var angular = require('angular');
module.exports = ['$templateCache', function($templateCache) {
	return {
		replace: true,
		transclude: true,
		template: $templateCache.get('common/input/attribute-set-select'),
		scope: {
			selectable: '=ncSelectOptions',
			model: '=ncModel',
			options: '=ncOptions'
		},
		link: function(scope, element, attrs, ctrl) {
			//Extend options
			scope.options = angular.extend({

			}, scope.options);

			//
			if(angular.isUndefined(scope.selectable) || 
				angular.isUndefined(scope.model)) {

			}
			angular.forEach(scope.leftList, function(item) {
			});
		},
		controller: ['$scope', function($scope) {

		}]
	};
}];