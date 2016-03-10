angular.module('nc')
	.provider('$ncAlert', function() {
		this.defaultErrorMessage = 'Error';
		this.defaultSuccessMessage = 'Success';
		this.$get = function() {
			return this;
		};
	})
	.directive('ncAlert', function($templateCache) {
		return {
			restrict: 'E',
			scope: {
				alert: '=ncModel'
			},
			template: $templateCache.get('common/ncAlert')
		}
	})
	.factory('NcAlert', function($document, $timeout, $ncAlert) {
		return function() {
			var vm = this;
			this.type = 'red';
			this.show = false;
			this.close = function() {
				this.show = false;
			};
			this.open = function(success, msg, color) {
				color = _.isNil(color) ? 'red' : color;
				this.type = (success) ? 'green' : color;

				if(msg) {
					this.message = msg;
				} else {
					this.message = success ? $ncAlert.defaultSuccessMessage : $ncAlert.defaultErrorMessage;
				}

				this.show = true;
			};
			this.error = function(obj) {
				this.open(false, obj);
				
				$timeout(function() {
					var section = vm.element || $document;
					section.scrollTopAnimated(0, 1000);
				}, 10);
			};
			this.success = function(obj) {
				this.open(true, obj);
				
				$timeout(function() {
					var section = vm.element || $document;
					section.scrollTopAnimated(0, 1000);
				}, 10);
			};
			this.message = '';
		};
	});