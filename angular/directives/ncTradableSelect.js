module.exports = function($templateCache, $filter) {
	'ngInject';
	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		scope: {
			selectable: '=ncSelectOptions',
			model: '=ncModel',
			options: '=ncOptions',
			test: '=?ncTest'
		},
		template: function(element, attrs) {
			if(attrs.ncTradableSelect) {
				return $templateCache.get(attrs.ncTradableSelect);
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
		controller: function($scope) {
			'ngInject';
			$scope.search = {};
			$scope.activeRight = -1;
			$scope.activeLeft = -1;
			$scope.test = $scope.test || function() { return false; };
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
					for (var i = $scope.activeRight; i < $scope.model.length; i++) {
						if(angular.isDefined($scope.model[$scope.activeRight]) && 
							$scope.test($scope.model[$scope.activeRight])) {
							continue;
						}
						return i;
					}
					for (var i = $scope.activeRight; i >= 0; i--) {
						if(angular.isDefined($scope.model[$scope.activeRight]) &&
							$scope.test($scope.model[$scope.activeRight])) {
							continue;
						}
						return i;
					}

					return -1;
				}
			};
			var findClosestIndexLeft = function() {
				if ($scope.selectable.length - $scope.model.length <= 0) {
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
					if ($scope.activeRight < 0 || 
						(angular.isDefined($scope.model[$scope.activeRight]) &&
						$scope.test($scope.model[$scope.activeRight]))) {
						return;
					}
					$scope.model.splice($scope.activeRight, 1);
					var next = findClosestIndexRight();
					$scope.activeRight = next;
				}
			};
			$scope.active = function(direction) {
				if(direction) {
					if($scope.activeRight >= 0 && angular.isDefined($scope.model[$scope.activeRight]) && !$scope.test($scope.model[$scope.activeRight])) 
						return 'active';
				} else {
					if($scope.activeLeft >= 0 && !$scope.contain($scope.selectable[$scope.activeLeft])) 
						return 'active';
				}
			}
			$scope.select = function($index, direction) {
				if(direction) {
					$scope.activeLeft = $index;
					$scope.activeRight = -1;
				} else {
					if(angular.isDefined($scope.model[$index]) &&
						$scope.test($scope.model[$index]))
						return;
					$scope.activeRight = $index;
					$scope.activeLeft = -1;
				}
			};
			$scope.contain = function(item) {
				return $scope.model.findIndex(findFn, item) != -1;
			};
		}
	};
};