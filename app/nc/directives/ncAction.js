angular.module('nc')
	.directive('ncAction', function($templateCache, $uibModal) {
		return {
			restrict: 'E',
			scope: {
				model: '=ncModel',
				options: '=ncActionFn'
			},
			template: $templateCache.get('common/ncAction.html'),
			link: function(scope) {
				scope.options = _.defaults(scope.options, []);
				scope.call = function(action) {
					if(action.confirmation) {
						var modal = $uibModal.open({
							animation: true,
							size: 'size-warning',
							templateUrl: 'common/ncActionModal.html',
							controller: function($scope, $uibModalInstance, options, $interpolate) {
								$scope.title = options.title;
								$scope.message = $interpolate(options.message)(scope);
								$scope.btnNo = options.btnNo || 'Cancel';
								$scope.btnYes = options.btnYes || 'Confirm';
								$scope.btnClass = options.btnClass || 'btn-blue';
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
										message: action.confirmation.message,
										btnNo: action.confirmation.btnCancel,
										btnYes: action.confirmation.btnConfirm,
										btnClass: action.confirmation.btnClass
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
