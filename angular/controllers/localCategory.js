/**
 * Handle local category listing and adding
 */
module.exports = function($scope, $rootScope, $uibModal, $timeout, common, Category, LocalCategoryService, AttributeSetService, NcAlert, util, config){
	'ngInject';
	$scope.modalScope = null;
	$scope.categories = [];
	$scope.timerPromise = null;
	$scope.popover = false;
	$scope.loading = false;
	$scope.saving = false;
	$scope.dirty = false;
	$scope.alert = new NcAlert();

	//Prevent leaving if unsave with dirty form
	util.warningOnLeave(function() {
		var modalDirty = $scope.modalScope == null ? false : $scope.modalScope.form.$dirty;
		return $scope.saving || $scope.dirty || modalDirty;
	});
	//Expand and collapse all
	$scope.collapseAll = function() {
		$rootScope.$broadcast('angular-ui-tree:collapse-all');
	}
	$scope.expandAll = function() {
		$rootScope.$broadcast('angular-ui-tree:expand-all');
	}

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
			$scope.sync()
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
		LocalCategoryService.visible([_.pick(node, ['Visibility', 'CategoryId'])])
			.then(function() {
				Category.traverseSet(node.nodes, 'Visibility', node.Visibility);
			},
			function(err) {
				//revert
				$scope.alert.error(common.getError(err));
				node.Visibility = !node.Visibility;
			});
	};

	//Update cat by sending the whole tree.
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
		$scope.pristine = true;
		$scope.saving = true;
		//sync with local cat after timeout is met
		$scope.timerPromise = $timeout(function() {
			LocalCategoryService.upsert(Category.transformUITreeToNestedSet($scope.categories))
				.then(function() {
					$scope.alert.close();
				}, function(err) {
					$scope.pristine = true;
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

	//Condition at which tradable select will lock attributeset
	$scope.lockAttributeset = function(i) {
		return angular.isUndefined(i.ProductCount) || (i.ProductCount == 0);
	};

	//Open category modal
	$scope.open = function(item) {
		//Open add or edit one category
		var modal = $uibModal.open({
			animation: false,
			size: 'xl',
			keyboard: false,
			templateUrl: 'local_category/modal',
			controller: function($scope, $uibModalInstance, $timeout, LocalCategoryService, NcAlert, config, id, Product, ImageService) {
				'ngInject';
				//parent scope
				$scope.$parent.modalScope = $scope;
				$scope.alert = new NcAlert();
				$scope.statusOptions = config.DROPDOWN.VISIBLE_DROPDOWN;

				// image uploaders
				$scope.bannerUploader = ImageService.getUploaderFn('/LocalCategoryImages', {
					data: { Type: 'Banner' }
				});
				$scope.bannerSmUploader = ImageService.getUploaderFn('/LocalCategoryImages', {
					data: { Type: 'SmallBanner' }
				});
				//validation condition for image uploader
				$scope.bannerOptions = {
					validateDimensionMin: [1920, 1080],
					validateDimensionMax: [1920, 1080]
				};
				$scope.bannerSmOptions = {
					validateDimensionMin: [1600, 900],
					validateDimensionMax: [1600, 900]
				};
				$scope.formData = {};
				$scope.saving = false;
				$scope.loading = true;
				$scope.products = [];
				$scope.availableProducts = -1;
				$scope.id = id;
				$scope.sortBy = [];
				
				//get sortBy list
				common.getSortBy().then(function(data) {
					$scope.sortBy = data;
				});

				//For searching feature prod
				var search = {};

				//create
				if(id == 0) {
					$scope.formData = LocalCategoryService.generate();
					$scope.loading = false;
				} else {
					//edit
					$scope.loading = true;

					//get local category by id
					LocalCategoryService.get(id)
						.then(function(data) {
							$scope.formData = LocalCategoryService.deserialize(data);
							search = _.pick($scope.formData, ['Lft', 'Rgt']);
							//Check product count
							Product.advanceList({
								LocalCategories: [search],
								_limit: 1,
							}).then(function(response) {
								$scope.availableProducts = response.total;
							});

						}, function(err) {
							$scope.alert.error(common.getError(err));
						}).finally(function() {
							$scope.loading = false;
						});
				};

				//get product feature froms search text
				$scope.getFeatureProduct = function(text) {
					Product.advanceList({
						LocalCategories: [search],
						_limit: 8,
						searchText: text
					}).then(function(response) {
						$scope.products = response.data;
					});
				};

				//fail image validation
				$scope.uploadBannerFail = function(e, response, min, max) {
					if(e == 'onmaxsize') {
						$scope.alert.error('Maximum number of banner reached. Please remove previous banner before adding a new one', true);
					}
					else if(e == 'ondimension') {
						$scope.alert.error('Image must be 1920x1080 pixels', true);
					}
					else if(e == 'onfilesize') {
						$scope.alert.error('Image file size should not exceed 5MB', true)
					}
					else {
						$scope.alert.error(common.getError(response.data), true);
					}
				};
				$scope.uploadBannerSmFail = function(e, response, min, max) {
					if(e == 'onmaxsize') {
						$scope.alert.error('Maximum number of banner reached. Please remove previous banner before adding a new one', true);
					}
					else if(e == 'ondimension') {
						$scope.alert.error('Image must be 1600x900 pixels', true);
					}
					else if(e == 'onfilesize') {
						$scope.alert.error('Image file size should not exceed 5MB', true)
					}
					else {
						$scope.alert.error(common.getError(response.data), true);
					}
				};

				//on modal closing, prompt for unsaved content
				$scope.$on('modal.closing', function(e, res, closeType) {
					if(!closeType) {
						if ($scope.saving) e.preventDefault();
						if ($scope.form.$dirty) {
							if(!confirm('Are you sure you want to leave this page?')) {
								e.preventDefault();
							}
						} else {
							$scope.$parent.modalScope = null;
						}
					}
				});

				// is uploading flag
				var isUploading = function(images) {
					var i = true;
					_.forEach(images, function(e) {
						if(e.progress) {
							i = i && (e.progress >= 100.0);
						}
					});
					return !i;
				}
				// save action
				$scope.save = function() {
					$scope.alert.close();
					$scope.form.$setSubmitted();

					// check for if image is uploading
					// only allow save after all images are uploaded
					if(isUploading($scope.formData.CategoryBannerEn) ||
						isUploading($scope.formData.CategoryBannerTh) ||
						isUploading($scope.formData.CategorySmallBannerEn) ||
						isUploading($scope.formData.CategorySmallBannerTh) ) {
						$scope.alert.error('Please wait for every images to be uploaded before saving', true)
						return;
					}
					// validate form data
					if($scope.form.$valid) {
						var processed = LocalCategoryService.serialize($scope.formData);
						$scope.saving = true;
						if(id == 0) { //create
							LocalCategoryService.create(processed)
								.then(function(data) {
									$uibModalInstance.close(LocalCategoryService.deserialize(data));
								}, function(err) {
									$scope.alert.error(common.getError(err));
									$scope.saving = false;
								})
						} else {
							//update
							LocalCategoryService.update(id, processed)
								.then(function(data) {
									$uibModalInstance.close(LocalCategoryService.deserialize(data));
								}, function(err){
									$scope.alert.error(common.getError(err));
									$scope.saving = false;
								});
						}
					} else {
						$scope.alert.error(config.DEFAULT_ERROR_MESSAGE, true);
					}
				};
			},
			resolve: {
				id: function() {
					return _.isUndefined(item) ? 0 : item.CategoryId ; //cat id
				}
			}
		});
	
		//Update category list on save
		modal.result.then(function(data) {
			if(_.isUndefined(item)) {
				data.nodes = [];
				data.ProductCount = 0;
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
		$scope.reload(true);
	};
	//Load category list
	$scope.reload = function() {
		$scope.loading = true;
		LocalCategoryService.listAll().then(function(data) {
			$scope.categories = Category.transformNestedSetToUITree(data);
			$scope.loading = false;
		}, function(err) {
			$scope.loading = false;
			$scope.alert.open(false, common.getError(err));
		});
	};

};
