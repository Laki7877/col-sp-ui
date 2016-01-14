var angular = require('angular');
module.exports = ['$templateCache', '$filter', function($templateCache, $filter) {
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
			if(angular.isUndefined(scope.selectable)) {
				throw 'Please set required field "ncSelectOptions"';
			}
		},
		controller: ['$scope', function($scope) {
			$scope.search = {};
			$scope.activeRight = -1;
			$scope.activeLeft = -1;
			var findFn = function(element) {
				if ($scope.options.map.value != null) {
					if (element[$scope.options.map.value] === this[$scope.options.map.value]) {
						return true;
					}
				} else {
					if (element == this) {
						return true;
					}
				}
				return false;
			}
			var findClosestIndexRight = function() {
				if ($scope.model.length <= 1) {
					return $scope.model.length - 1;
				} else {
					if($scope.activeRight < $scope.model.length - 1) {
						return $scope.activeRight + 1;
					} else {
						return $scope.activeRight - 1;
					}
				}
			};
			var findClosestIndexLeft = function() {
				if ($scope.selectable.length - $scope.model.length <= 1) {
					return -1;
				}
				else {
					var item = $scope.selectable[$scope.activeLeft];
					var outersect = $scope.selectable.filter(function(obj) {
						return !$scope.contain(obj) && ($filter('filter')($scope.selectable, $scope.search, 'strict').findIndex(findFn, obj) != -1);
					});

					var oIndex = outersect.indexOf(item);
					if(oIndex !== outersect.length - 1) {
						oIndex++;
					} else {
						oIndex--;
					}
					return $scope.selectable.indexOf(outersect[oIndex]);
				}
			};
			$scope.transfer = function(direction) {
				if(direction) {
					//left to right
					if ($scope.activeLeft < 0) {
						return;
					}
					var item = $scope.selectable[$scope.activeLeft];
					$scope.model.push(angular.copy(item));
					var next = findClosestIndexLeft();
					$scope.activeLeft = next;

				} else {
					if ($scope.activeRight < 0) {
						return;
					}
					$scope.model.splice($scope.activeRight, 1);
					var next = findClosestIndexRight();
					$scope.activeRight = next;
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
				return $scope.model.findIndex(findFn, item) != -1;
			};
		}]
	};
}];