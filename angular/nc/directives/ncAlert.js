angular.module('nc')
	.directive('ncAlert', function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				alert: '=ncModel'
			},
			template: $templateCache.get('common/ncAlert')
		}
	})
	.factory('NcAlert', function($document, $timeout) {
		return function() {
			this.type = 'red';
			this.show = false;
			this.close = function() {
				this.show = false;
			};
			this.open = function(success, msg) {
				this.type = success ? 'green' : 'red';
				this.message = success ? (msg ? msg : 'Your change has been saved.') : msg;
				this.show = true;
			};
			this.error = function(obj) {
				this.open(false, obj);
				
				$timeout(function() {
					var section = angular.element('body');
					$document.scrollTo(section, 0, 1000);
				}, 10);
			};
			this.success = function(obj) {
				this.open(true, obj);
				
				$timeout(function() {
					var section = angular.element('body');
					$document.scrollTo(section, 0, 1000);
				}, 10);
			};
			this.message = '';
		};
	});