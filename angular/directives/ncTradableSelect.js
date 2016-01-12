var angular = require('angular');
module.exports = ['$templateCache', function($templateCache) {
	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		scope: {
			selectable: '=ncSelectOptions',
			model: '=ncModel',
			options: '=ncOptions'
		},
		template: function(element, attrs) {
			if(attrs.ncTemplate) {
				return $templateCache.get(attrs.ncTemplate);
			} else {
				return $templateCache.get('common/input/tradable-select');
			}
		},
		link: function(scope, element, attrs, ctrl) {
			//Extend options
			scope.options = angular.merge({
				map: {
					text: null,
					value: null
				}
			}, scope.options);
			scope.model = scope.model || [];

			//Required attr
			console.log(scope);
			if(angular.isUndefined(scope.selectable)) {
				throw 'Please set required field "ncSelectOptions"';
			}
		},
		controller: ['$scope', function($scope) {
			$scope.search = {};
			$scope.activeRight = -1;
			$scope.activeLeft = -1;
			$scope.findClosest = function() {

			};
			$scope.transfer = function(direction) {
				if(direction) {
					//left to right
					if($scope.activeLeft < 0) {
						return;
					}
					var item = $scope.selectable[$scope.activeLeft];
					$scope.model.push(item);

				} else {
					if($scope.activeRight < 0) {
						return;
					}
					$scope.model.splice($scope.model[$scope.activeRight], 1);

					if($scope.model.length <= 0) {
						$scope.activeRight = -1;
					} else if($scope.model.length == 1) {
						$scope.activeRight = 0;
					} else if($scope.activeRight >= $scope.model.length) {
						$scope.activeRight = $scope.model.length - 1;
					}
				}
			};
			$scope.select = function($index, direction) {
				if(direction) {
					$scope.activeLeft = $index;
				} else {
					$scope.activeRight = $index;
				}
			};
			$scope.contain = function(item) {
				return $scope.model.findIndex(function(element) {
					if ($scope.options.map.value != null) {
						if (element[$scope.options.map.value] == item[$scope.options.map.value]) {
							return true;
						}
					} else {
						if (element == item) {
							return true;
						}
					}
					return false;
				}) != -1;
			};
		}]
	};
}];