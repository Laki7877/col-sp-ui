angular.module('nc')
	.directive('ncAction', function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				model: '=ncModel',
				options: '=ncActionFn'
			},
			template: $templateCache.get('common/ncAction'),
			link: function(scope) {
				scope.options = _.defaults(scope.options, []);
				scope.call = function(action) {
					action.fn(scope.model);
				};
			}
		}
	})
	.directive('ncPopoverAny', function($document, $window) {
		$window._globalPopoverAny = null;
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				scope.isOpen = false;
				element.on('click', function(e) {
					if(scope.isOpen) {
						element.get(0).dispatchEvent(new Event('clickanyend'));
						scope.isOpen = false;
						$window._globalPopoverAny = null;
					} else {
						element.get(0).dispatchEvent(new Event('clickanystart'));
						scope.isOpen = true;
						if($window._globalPopoverAny != null) 
							$window._globalPopoverAny.get(0).dispatchEvent(new Event('clickanyend'));
						$window._globalPopoverAny = element;
						e.stopPropagation();
					}
				});
				$document.on('click', function() {
					element.get(0).dispatchEvent(new Event('clickanyend'));
				});
			}
		};
	});