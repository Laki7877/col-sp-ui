var angular = require('angular');
module.exports = ['$document', function($document) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.on('click', function(e) {
				element.get(0).dispatchEvent(new Event('clickanystart'));
				e.stopPropagation();
			});
			$document.on('click', function() {
				element.get(0).dispatchEvent(new Event('clickanyend'));
			});
		}
	};
}];