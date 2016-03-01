angular.module('nc')
	.service('NcAction', function() {
	 	this.view = function (uri, id, name) {
	        return {
	            name: name || 'View / Edit',
	            fn: function (item) {
	                $window.location.href = uri + '/' + item[id];
	            }
	        };
	 	};
	 	this.delete = function (rest, id, item, alert, reload, cb) {
	        return {
	            name: 'Delete',
	            fn: function (obj) {
	                alert.close();

	                //Only pass id
	                var obj = _.pick(obj, [id]);


	                //Delete bulk
	                rest.delete([obj])
	                    .then(function () {
	                        alert.success('Delete successful.');
	                        cb(obj, id);
	                    }, function (err) {
	                        alert.error(common.getError(err));
	                    })
	                    .finally(reload);
	            },
	            confirmation: {
	                title: 'Delete',
	                message: 'Are you sure you want to delete selected ' + item + '?',
	                btnConfirm: 'Delete',
	                btnClass: 'btn-red'
	            }
	        };
	 	};
	 	this.duplicate = function (rest, id, item, alert, reload) {
	        return {
	            name: 'Duplicate',
	            fn: function (obj) {
	                alert.close();

	                //Delete bulk
	                rest.duplicate(obj[id])
	                    .then(function () {
	                        alert.success('Duplicate successful.');
	                    }, function (err) {
	                        alert.error(common.getError(err));
	                    })
	                    .finally(reload);
	            },
	            confirmation: {
	                title: 'Duplicate',
	                message: 'Are you sure you want to duplicate selected ' + item + '?',
	                btnConfirm: 'Duplicate'
	            }
	        };
	 	};
	})
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
