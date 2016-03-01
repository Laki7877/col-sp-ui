angular.module('nc')
	.service('NcBulk', function() {
	    this.template = function (actionName, restFn, id, item, confirmOpts) {
	        return function (scope) {
	             return {
	                name: actionName,
	                fail: function() {
	                    scope.alert.error('Unable to ' + actionName.toLowerCase() + '. Please select ' + item + ' for this action.');
	                },
	                fn: function (array, cb) {
	                    scope.alert.close();

	                    //Only pass ShopId
	                    var array = _.map(array, function (e) {
	                        return _.pick(e, [id]);
	                    });

	                    //On launch endpoint
	                    scope.onLoad();

	                    //generic bulk
	                    restFn(array)
	                        .then(function () {
	                            scope.alert.success(actionName + ' successful.');
	                            cb();
	                        }, function (err) {
	                            scope.alert.error(common.getError(err));
	                        })
	                        .finally(scope.reload);
	                },
	                confirmation: _.extend({
	                    title: 'Confirm to ' + actionName.toLowerCase(),
	                    message: 'Are you sure you want to '+ actionName.toLowerCase() + ' {{model.length}} items?'
	                }, confirmOpts || {})
	            };
	        };
	    };
	    this.delete = function (rest, id, item, alert, reload, onload) {
	        return {
	            name: 'Delete',
	            fail: function() {
	                alert.error('Unable to delete. Please select ' + item + ' for this action.');
	            },
	            fn: function (array, cb) {
	                alert.close();

	                //Only pass ShopId
	                var array = _.map(array, function (e) {
	                    return _.pick(e, [id]);
	                });

	                //On launch endpoint
	                (onload || _.noop)();

	                //Delete bulk
	                rest.delete(array)
	                    .then(function () {
	                        alert.success('Delete successful.');
	                        cb();
	                    }, function (err) {
	                        alert.error(common.getError(err));
	                    })
	                    .finally(reload);
	            },
	            confirmation: {
	                title: 'Confirm to delete',
	                message: 'Are you sure you want to delete {{model.length}} items?',
	                btnConfirm: 'Delete',
	                btnClass: 'btn-red'
	            }
	        };
	    };
	    this.show = function (rest, id, item, alert, reload) {
	        return {
	            name: 'Show',
	            fail: function() {
	                alert.error('Unable to change visibility. Please select ' + item + ' for this action.');
	            },
	            fn: function (array, cb) {
	                alert.close();

	                //Only pass ShopId
	                var array = _.map(array, function (e) {
	                    var i = _.pick(e, [id]);
	                    i.Visibility = true;
	                    return i;
	                });

	                //Delete bulk
	                rest.visible(array)
	                    .then(function () {
	                        alert.success('Changed successful.');
	                        cb();
	                    }, function (err) {
	                        alert.error(common.getError(err));
	                    })
	                    .finally(reload);
	            },
	            confirmation: {
	                title: 'Confirm to show',
	                message: 'Are you sure you want to change visibility of {{model.length}} items?',
	                btnConfirm: 'Show'
	            }
	        };
	    };
	    this.hide = function (rest, id, item, alert, reload) {
	        return {
	            name: 'Hide',
	            fail: function() {
	                alert.error('Unable to hide. Please select ' + item + ' for this action.');
	            },
	            fn: function (array, cb) {
	                alert.close();

	                //Only pass ShopId
	                var array = _.map(array, function (e) {
	                    var i = _.pick(e, [id]);
	                    i.Visibility = false;
	                    return i;
	                });

	                //Delete bulk
	                rest.visible(array)
	                    .then(function () {
	                        alert.success('Changed successful.');
	                        cb();
	                    }, function (err) {
	                        alert.error(common.getError(err));
	                    })
	                    .finally(reload);
	            },
	            confirmation: {
	                title: 'Confirm to hide',
	                message: 'Are you sure you want to hide {{model.length}} items?',
	                btnConfirm: 'Hide',
	                btnClass: 'btn-red'
	            }
	        };
	    };
	})
	.directive('ncBulk', function($templateCache, $uibModal) {
		return {
			restrict: 'E',
			template: $templateCache.get('common/ncBulk'),
			scope: {
				model: '=ncModel',
				options: '=ncBulkFn',
				select: '=?ncBulkSelect',
				id: '@ncBulkTrackBy',
				tag: '@ncTag'
			},
			link: function(scope) {
				var defaultOption = {
					name: '- Choose Action -',
					fn: function() {

					}
				};
				scope.options = _.concat(defaultOption, _.defaults(scope.options, []));
				scope.model = _.defaults(scope.model, []);

				scope.id = _.defaults(scope.id, null);
				scope.select = scope.options[0];

				scope.uniq = function(e) {
					if(scope.id != null) {
						if(_.isUndefined(e[scope.id])) {
							throw 'Object does not contain property of ncBulkTrackBy = "' + scope.id + '"';
						}
						return e[scope.id];
					} else {
						return e;
					}
				};
				scope.selectOption = function(option) {
					scope.select = option;
				}
				scope.onChildChange = function(value, obj) {
					if(value) {
						scope.model = _.uniq(_.concat(scope.model, obj), scope.uniq);
					} else {
						if(_.isArray(obj)) {
							_.pullAllBy(scope.model, obj, scope.uniq);
						} else {
							_.pullAllBy(scope.model, [obj], scope.uniq);
						}
					}
				};
				scope.findChild = function(obj) {
					if(_.isArray(obj)) {
						return _.differenceBy(scope.model, obj, scope.uniq).length == (scope.model.length - obj.length);
					} else {
						return !_.isUndefined(_.find(scope.model, function(e) {
							return scope.uniq(e) === scope.uniq(obj);
						}));
					}
				};
				scope.call = function() {
					if(scope.select != scope.options[0]) {
						if(scope.select.fail && scope.model.length == 0) {
							scope.select.fail(scope.model);
							return;
						}
						if(scope.select.confirmation) {
							var modal = $uibModal.open({
								animation: true,
								size: 'size-warning',
								templateUrl: 'common/ncBulkModal',
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
											title: scope.select.confirmation.title,
											message: scope.select.confirmation.message,
											btnNo: scope.select.confirmation.btnCancel,
											btnYes: scope.select.confirmation.btnConfirm,
											btnClass: scope.select.confirmation.btnClass
										}
									}
								}
							});
							//Modal 
							modal.result.then(function() {
								scope.select.fn(scope.model, function() {
									//cb to clear all entries
									scope.model = [];
								});
							});
						} else {
							scope.select.fn(scope.model, function() {
								//cb to clear all entries
								scope.model = [];
							});
						}
					}
				};
			}
		}
	})
	.directive('ncBulkCheckbox', function($templateCache) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				model: '=ncModel',
				tag: '@ncTag'
			},
			template: $templateCache.get('common/ncBulkCheckbox'),
			link: function(scope) {
				if (_.isUndefined(scope.tag)) {
					scope.parent = angular.element(document).find('nc-bulk').isolateScope();
				} else {
					scope.parent = angular.element(document).find('nc-bulk[ncTag="' + scope.tag + '"]').isolateScope();
				}

				scope.prevent = false;
				scope.checkbox = false;
				

				var updateModel = function(val, val2) {
					var checkbox = scope.parent.findChild(scope.model);
					if(checkbox !== scope.checkbox) {
						scope.prevent = true;
						scope.checkbox = checkbox;
					}
				};

				scope.$watch('model', updateModel, true);
				scope.$watch('checkbox', function(val, val2) {
					if(scope.prevent) {
						scope.prevent = false;
						return;
					}
					scope.parent.onChildChange(val, scope.model);
				});
				scope.parent.$watch('model', updateModel, true);
			}
		}
	});