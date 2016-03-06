
module.exports = function($scope, $rootScope, $uibModal, $timeout, common, Category, GlobalCategoryService, AttributeSetService, NcAlert, util, config){
	'ngInject';

	$scope.categories = [];
	$scope.modalScope = null;
	$scope.timerPromise = null;
	$scope.popover = false;
	$scope.loading = false;
	$scope.saving = false;
	$scope.dirty = false;
	$scope.alert = new NcAlert();
	$scope.attributeSetOptions = [];

	util.warningOnLeave(function() {
		var modalDirty = $scope.modalScope == null ? false : $scope.modalScope.form.$dirty;
		return $scope.saving || $scope.dirty || modalDirty;
	});

	//UiTree onchange event
	$scope.treeOptions = {
		dropped: function(event) {
			if(event.dest.index != event.source.index || event.dest.nodesScope != event.source.nodesScope) {
				$scope.sync();
			}
		}
	};

	//Action gear
	$scope.actions = [
	{
		name: 'View / Edit',
		fn: function($nodeScope) {
			$scope.open($nodeScope.$modelValue);
		}
	},
	{
		name: 'Delete',
		fn: function($nodeScope) {
			$nodeScope.remove();
			$scope.sync();
		},
		confirmation: {
			title: 'Delete',
			message: 'Are you sure you want to delete this category?',
			btnClass: 'btn-red',
			btnConfirm: 'Delete'
		}
	}];


	//Toggle visibility
	$scope.toggleVisibility = function(node) {
		$scope.alert.close();
		node.Visibility = !node.Visibility;
		GlobalCategoryService.visible([_.pick(node, ['Visibility', 'CategoryId'])])
			.then(function() {
				Category.traverseSet(node.nodes, 'Visibility', node.Visibility);
			},
			function(err) {
				//revert
				$scope.alert.error(common.getError(err));
				node.Visibility = !node.Visibility;
			});
	};

	//Update global cat by sending the whole tree.
	//We put some timeout delay to simulate multiple-edit-single-update
	$scope.sync = function(delay) {
		if($scope.saving) {
			$scope.dirty = true;
			return;
		}
		if($scope.timerPromise != null) {
			$timeout.cancel($scope.timerPromise);
			$scope.timerPromise = null;
		}
		$scope.saving = true;
		$scope.pristine = true;
		$scope.timerPromise = $timeout(function() {
				GlobalCategoryService.upsert(Category.transformUITreeToNestedSet($scope.categories))
				.then(function() {
					$scope.alert.close();
				}, function(err) {
					$scope.pristine = false;
					$scope.alert.error(common.getError(err));
					$scope.reload();
				})
				.finally(function() {
					$scope.saving = false;
					if($scope.dirty) {
						$scope.dirty = false;
						$scope.sync();
					}
				});
			}, delay || config.CATEGORY_SYNC_DELAY);
	};

	//Load attribute sets for global cat modal selection
	$scope.loadAttributeSets = function() {
		AttributeSetService.listAll().then(function(data) {
			$scope.attributeSetOptions = data;
		});
	};

	//Condition at which tradable select will lock attributeset
	$scope.lockAttributeset = function(i) {
		return false;
	};

	//Open category modal
	$scope.open = function(item) {
		//Open add or edit one category
		var modal = $uibModal.open({
			animation: true,
			size: 'lg',
			keyboard: false,
			templateUrl: 'global_category/modal',
			controller: function($scope, $uibModalInstance, $timeout, GlobalCategoryService, NcAlert, config, id, attributeSetOptions, Product) {
				'ngInject';
				$scope.$parent.modalScope = $scope;
				$scope.alert = new NcAlert();
				$scope.statusOptions = config.DROPDOWN.VISIBLE_DROPDOWN;
				$scope.attributeSetOptions = attributeSetOptions;
				$scope.formData = {};
				$scope.saving = false;
				$scope.loading = true;
				$scope.products = [];
				$scope.availableProducts = -1;
				$scope.id = id;

				if(id == 0) {
					$scope.formData = GlobalCategoryService.generate();
					$scope.loading = false;
				} else {
					//Check product count
					Product.advanceList({
						GlobalCategories: [{CategoryId: id}],
						_limit: 1,
					}).then(function(response) {
						$scope.availableProducts = response.total;
					});
					//Load cat
					GlobalCategoryService.get(id)
						.then(function(data) {
							$scope.formData = data;
						}, function(err) {
							$scope.alert.error(common.getError(err));
						}).finally(function() {
							$scope.loading = false;
						});
				};
				$scope.getFeatureProduct = function(text) {
					Product.advanceList({
						GlobalCategories: [{CategoryId: id}],
						_limit: 8,
						searchText: text
					}).then(function(response) {
						$scope.products = response.data;
					});	
				};
				$scope.uploadBannerFail = function(e, response) {
					if(e == 'onmaxsize') {
						$scope.alert.error('Maximum number of banner reached. Please remove previous banner before adding a new one');
					}
					else {
						$scope.alert.error(common.getError(response.data));
					}
				};

				$scope.$on('modal.closing', function(e, res, closeType) {
					if(!closeType) {
						if ($scope.saving) e.preventDefault();
						if ($scope.form.$dirty) {
							if(!confirm('Your changes will not be saved.')) {
								e.preventDefault();
							}
						} else {
							$scope.$parent.modalScope = null;
						}
					}
				});
				$scope.save = function() {
					$scope.alert.close();
					$scope.saving = true;

					if($scope.form.$valid) {
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
								.then(function(data) {
									$uibModalInstance.close(GlobalCategoryService.deserialize(data));
								}, function(err){
									$scope.alert.error(common.getError(err));
									$scope.saving = false;
								});
						}
					} else {
						$scope.alert.error(config.DEFAULT_ERROR_MESSAGE);
						$timeout(function() {
							$scope.saving = false;
						},0);
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
			},
			scope: $scope
		});

		modal.result.then(function(data) {
			if(_.isUndefined(item)) {
				data.nodes = [];
				data.ProductCount = 0;
				data.AttributeSetCount = 0;
				$scope.categories.unshift(data);
			} else {
				//existing data
				item.NameEn = data.NameEn;
				item.CategoryId = data.CategoryId;
				item.CategoryAbbreviation = data.CategoryAbbreviation;
				item.Visibility = data.Visibility;
				Category.traverseSet(item.nodes, 'Visibility', item.Visibility);
		}
		$scope.alert.success(config.DEFAULT_SUCCESS_MESSAGE);
		});
	};

	//On init
	$scope.init = function() {
		$scope.reload();
		$scope.loadAttributeSets();
	};

	//Load category list
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
