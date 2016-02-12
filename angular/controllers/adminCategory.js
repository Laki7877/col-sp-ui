
module.exports = function($scope, $rootScope, $uibModal, common, Category, GlobalCategoryService, AttributeSetService, NcAlert, util, config){
	'ngInject';
	$scope.categories = [];
	$scope.attributeSetOptions = [];
	$scope.popover = false;
	$scope.loading = false;
	$scope.dirty = false;
	$scope.alert = new NcAlert();
	$scope.treeOptions = {
		dropped: function(event) {
			//Either index change or parent change
			if(event.dest.index != event.source.index || event.dest.nodesScope != event.source.nodesScope) {
				var child = event.source.nodeScope.$modelValue.CategoryId;
				var parent = event.dest.nodesScope.$nodeScope == null ? null : event.dest.nodesScope.$nodeScope.$modelValue.CategoryId; 
				
				var parentNodes = event.dest.nodesScope.$modelValue;
				var sibling = null;

				sibling = _.findIndex(parentNodes, function(e) {
					return e.CategoryId == child;
				});
				if(sibling == 0) {
					sibling = null;
				} else if (sibling < 0) {
					sibling = null;
					console.error('something is wrong', event);
					throw 'error';
				} else {
					sibling = parentNodes[sibling - 1].CategoryId;
				}

				var obj = {
					Parent: parent,
					Sibling: sibling,
					Child: child
				};

				//Shift
				GlobalCategoryService.shift(obj)
					.then(function() {
						console.info('success');
					}, function(err) {
						console.error(err);
					});
				
			}
		}
	};
	$scope.$on('delete', function(e, node) {
		GlobalCategoryService.delete([_.pick(node, ['CategoryId'])])
			.finally( function() {
				$scope.reload();
			});
	});
	$scope.lockAttributeset = function(i) {		
		return angular.isUndefined(i.ProductCount) || (i.ProductCount == 0);		
	};
	$scope.open = function(item) {
		//Open add-edit modal
		var modal = $uibModal.open({
			animation: true,
			backdrop: 'static',
			size: 'lg',
			keyboard: false,
			templateUrl: 'global_category/modal',
			controller: function($scope, $uibModalInstance, GlobalCategoryService, NcAlert, config, id, attributeSetOptions) {
				'ngInject';
				$scope.alert = new NcAlert();
				$scope.statusOptions = config.DROPDOWN.VISIBLE_DROPDOWN;
				$scope.attributeSetOptions = attributeSetOptions;
				$scope.formData = {};
				$scope.saving = false;

				$scope.form.$setPristine(true);
				if(id == 0) {
					$scope.formData = GlobalCategoryService.generate();
				} else {
					GlobalCategoryService.get(id)
						.then(function(data) {
							$scope.formData = data;
						}, function(err) {
							$scope.alert.error(common.getError(err));
						});
				}

				$scope.cancel = function() {
					if(!$scope.saving) {
						$uibModalInstance.dismiss();
					}
				};
				$scope.save = function() {
					$scope.alert.close();

					if($scope.form.$valid) {
					$scope.saving = true;
					var processed = GlobalCategoryService.serialize($scope.formData);
						if(id == 0) {
							GlobalCategoryService.create(processed)
								.then(function(data) {
									$uibModalInstance.close(GlobalCategoryService.deserialize(data));
								}, function(err) {
									$scope.alert.error(common.getError(err));
									$scope.saving = false;
								})
						} else {
							GlobalCategoryService.update(id, processed)
								.then(function() {
									$uibModalInstance.close(GlobalCategoryService.deserialize(data));
								}, function(err){
									$scope.alert.error(common.getError(err));
									$scope.saving = false;
								});
						}
					} else {
						$scope.alert.error(config.DEFAULT_ERROR_MESSAGE);
					}
				};
			},
			resolve: {
				id: function() {
					return _.isUndefined(item) ? 0 : item.CategoryId ;
				},
				attributeSetOptions: function() {
					return $scope.attributeSetOptions;
				}
			}
		});

		if(_.isUndefined(item)) {
			modal.result.then(function(data) {
				//new data
				data.nodes = [];
				$scope.categories.unshift(data);
			});
		} else {
			modal.result.then(function(data) {
				//existing data
				item.NameEn = data.NameEn;
				item.CategoryId = data.CategoryId;
				item.CategoryAbbreviation = data.CategoryAbbreviation;
				item.Visibility = data.Visibility;
			});
		}
	};

	$scope.init = function() {
		$scope.reload();
		$scope.loadAttributeSets();
	};
	$scope.loadAttributeSets = function() {
		AttributeSetService.listAll().then(function(data) { 
			$scope.attributeSetOptions = data;
		});
	}
	$scope.reload = function() {
		$scope.loading = true;
		GlobalCategoryService.listAll().then(function(data) {
			$scope.categories = Category.transformNestedSetToUITree(data);
			$scope.loading = false;
		}, function(err) {
			$scope.loading = false;
			$scope.alert.open(false, common.getError(err));
		});
	};

};