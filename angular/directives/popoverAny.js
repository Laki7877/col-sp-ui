var angular = require('angular');
module.exports = ['$document', '$window', function($document, $window) {
	$window._globalPopoverAny = null;
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.isOpen = false;
			element.on('click', function(e) {
				//var all = angular.element(document.querySelectorAll('[popover-any]'));

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
				/*
				angular.forEach(all, function(item) {
					if(item != element.get(0)) {
						item.dispatchEvent(new Event('clickanyend'));
					} else {
						if(!scope._open) {
							scope._open = true;
							element.get(0).dispatchEvent(new Event('clickanystart'));
						} else {
							scope._open = false;
							element.get(0).dispatchEvent(new Event('clickanyend'));
						}
						console.log(scope._open);
					}
				}); */
			});
			$document.on('click', function() {
				element.get(0).dispatchEvent(new Event('clickanyend'));
			});
		}
	};
}];