/**
 * Tradable select
 */
module.exports = function($templateCache, $filter) {
	'ngInject';
	return {
		restrict: 'EA',
		replace: true,
		transclude: true,
		scope: {
			selectable: '=ncSelectOptions',
			model: '=ncModel',
			test: '=?ncTest',
			callback: '=?onSearch',
			searchPlaceholder: '@?',
			columnHeader: '@?',
			id: '@ncId',
			text: '@ncText'
		},
		templateUrl: 'common/input/tradable-select',
		link: function(scope, element, attrs, ctrl) {
			//Extend options
			scope.model = scope.model || [];
			scope.search = '';
			scope.activeRight = -1;
			scope.activeLeft = -1;
			scope.test = scope.test || function() { return false; };

			//Right Column Header
			scope.header = attrs.columnHeader;

			//Search Placeholder
			scope.$watch('search', function(newObj) {
				(scope.callback || _.noop)(newObj);
			});
			scope.$watch('selectable', function() {
				if(_.isNil(scope.selectable))
					return;
				_.pullAllBy(scope.selectable, scope.model, scope.id);
				scope.selectable.sort(function(a,b) {
					return a[scope.id] - b[scope.id];
				});
			});

			//Drag event
			scope.onDrag = function($index, item) {
				scope.model.splice($index, 1);
				scope.select(_.findIndex(scope.model, function(e) { return e[scope.id] == item[scope.id] }), false);
			};
			
			//transfer between two list
			scope.transfer = function(direction) {
				if(_.isNil(scope.active(direction))) {
					return;
				}
				if(direction) {
					var removed = scope.selectable[scope.activeLeft];
					scope.selectable.splice(scope.activeLeft, 1);
					if(scope.activeLeft >= scope.selectable.length) {
						scope.activeLeft--;
					}
					scope.model.push(removed);
				} else {
					var removed = scope.model[scope.activeRight];
					scope.model.splice(scope.activeRight, 1);
					if(scope.activeRight >= scope.model.length) {
						scope.activeRight--;
					}
					scope.selectable.push(removed)
					scope.selectable.sort(function(a,b) {
						return a[scope.id] - b[scope.id];
					});
				}
			};
			// is active
			scope.active = function(direction) {
				if(!direction) {
					if(scope.activeRight >= 0 && !scope.test(scope.model[scope.activeRight]))
						return 'active';
				} else {
					if(scope.activeLeft >= 0)
						return 'active';
				}
			}
			// selecting item on list
			scope.select = function($index, direction) {
				if(direction) {
					scope.activeLeft = $index;
					scope.activeRight = -1;
				} else {
					if(scope.test(scope.model[$index]))
						return;
					scope.activeRight = $index;
					scope.activeLeft = -1;
				}

				return true;
			};
		}
	};
};
