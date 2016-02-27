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
	});
