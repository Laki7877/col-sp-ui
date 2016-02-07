angular.module('nc')
	.directive('ncAction', function($templateCache, $uibModal) {
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
					if(action.confirmation) {
						var modal = $uibModal.open({
							animation: true,
							size: 'size-warning',
							templateUrl: 'common/ncActionModal',
							controller: function($scope, $uibModalInstance, options) {
								$scope.title = options.title;
								$scope.message = options.message;
								$scope.yes = function() {
									$uibModalInstance.close();
								};
								$scope.no = function() {
									$uibModalInstance.dismiss();
								}
							},
							resolve: {
								options: function() {
									return {
										title: action.confirmation.title,
										message: action.confirmation.message
									}
								}
							}
						});

						//Modal 
						modal.result.then(function() {
							action.fn(scope.model);
						});
					} else {
						action.fn(scope.model);
					}
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