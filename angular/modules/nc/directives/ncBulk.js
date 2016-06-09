/**
 * bulk action
 */
angular.module('nc')
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
				// bulk options
				scope.options = _.concat(defaultOption, _.defaults(scope.options, []));
				scope.model = _.defaults(scope.model, []);

				scope.id = _.defaults(scope.id, null);
				scope.select = scope.options[0];

				// if bulk item is unique
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
				// remove unique when child change
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
				// find bulk child in container
				scope.findChild = function(obj) {
					if(_.isArray(obj)) {
						return _.differenceBy(scope.model, obj, scope.uniq).length == (scope.model.length - obj.length);
					} else {
						return !_.isUndefined(_.find(scope.model, function(e) {
							return scope.uniq(e) === scope.uniq(obj);
						}));
					}
				};
				// call bulk function api
				scope.call = function() {
					if(scope.select != scope.options[0]) {
						if(scope.select.fail && scope.model.length == 0) {
							scope.select.fail(scope.model);
							return;
						}
						// modal confirmation
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
							//modal resolution 
							modal.result.then(function() {
								scope.select.fn(scope.model, function() {
									//cb to clear all entries
									scope.model = [];
								});
							});
						} else if(scope.select.modal) {
							//custom modal
							var modal = $uibModal.open(_.merge({}, scope.select.modal, {
								resolve: {
									data: function() {
										return scope.model;
									}
								}
							}));
							//modal resolution
							modal.result.then(function(data) {
								scope.select.fn(scope.model, function() {
									//cb to clear all entries
									scope.model = [];
								}, data);
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
	//bulk checkbox
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
				// tagging for unique bulk tag
				if (_.isUndefined(scope.tag)) {
					scope.parent = angular.element(document).find('nc-bulk').isolateScope();
				} else {
					scope.parent = angular.element(document).find('nc-bulk[ncTag="' + scope.tag + '"]').isolateScope();
				}

				scope.prevent = false;
				scope.checkbox = false;
				
				// update parent model
				var updateModel = function(val, val2) {
					var checkbox = scope.parent.findChild(scope.model);
					if(checkbox !== scope.checkbox) {
						scope.prevent = true;
						scope.checkbox = checkbox;
					}
				};

				// watch model change
				scope.$watch('model', updateModel, true);
				scope.$watch('checkbox', function(val, val2) {
					if(scope.prevent) {
						scope.prevent = false;
						return;
					}
					// watch for child change
					scope.parent.onChildChange(val, scope.model);
				});
				// watch this model change
				scope.parent.$watch('model', updateModel, true);
			}
		}
	})