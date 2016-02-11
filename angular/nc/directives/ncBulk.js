angular.module('nc')
	.directive('ncBulk', function($templateCache, $uibModal) {
		return {
			restrict: 'E',
			template: $templateCache.get('common/ncBulk'),
			scope: {
				model: '=ncModel',
				select: '=ncBulkSelect',
				options: '=ncBulkFn',
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
						if(scope.select.confirmation && scope.model.length != 0) {
							var modal = $uibModal.open({
								animation: true,
								size: 'size-warning',
								templateUrl: 'common/ncBulkModal',
								controller: function($scope, $uibModalInstance, options, $interpolate) {
									$scope.title = options.title;
									$scope.message = $interpolate(options.message)(scope);
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
											message: scope.select.confirmation.message
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
	})