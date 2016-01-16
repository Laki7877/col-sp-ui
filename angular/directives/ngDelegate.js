var angular = require('angular');
module.exports = [function() {
	'use strict';
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {
			element.bind('click', function() {
				console.log('click-delegate');
				var delegate = attributes.ngDelegate;
				if(!angular.isString(delegate)) {
					throw 'ngDelegate is a "String"';
				}
				var delegatee = angular.element(document).find('[ng-delegatee="'+ delegate + '"]');
				if(!angular.isDefined(delegatee)) {
					throw 'ngDelegate cannot found matching ngDelegatee "' + delegate + '"';
				}

				delegatee.trigger('click');
			});
		}
	};
}];