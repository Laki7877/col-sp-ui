angular.module('nc')
	.provider('$ncAlert', function() {
		this.defaultErrorMessage = 'Error';
		this.defaultSuccessMessage = 'Success';
		this.$get = function() {
			return this;
		};
	})
	.directive('ncAlert', function($templateCache, NcAlert) {
		return {
			restrict: 'E',
			scope: {
				alert: '=ncModel'
			},
			template: $templateCache.get('common/ncAlert'),
			link: function(scope, elem) {
				scope.$watch('alert', function(newObj) {
					if(newObj instanceof NcAlert) {
						scope.alert.element = elem;
					}
				})
			}
		}
	})
	.factory('NcAlert', function($document, $timeout, $ncAlert, smoothScroll) {
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
			this.error = function(obj, toElm, scroll) {
				this.open(false, obj);
				
				$timeout(function() {
					var section = vm.element || $document;
					if(!_.isNil(scroll) && scroll) {
						smoothScroll(toElm ? vm.element[0] : $document[0].body, {
							container: toElm ? '.modal': null
						});
					} else {
						smoothScroll(toElm ? vm.element[0] : $document[0].body, {
							container: toElm ? '.modal': null
						});
					}
				}, 10);
			};
			this.success = function(obj, toElm) {
				this.open(true, obj);
				
				$timeout(function() {
					var section = vm.element || $document;
					smoothScroll(toElm ? vm.element[0] : $document[0].body, {
						container: toElm ? '.modal': null
					});
				}, 10);
			};
			this.message = '';
		};
	});