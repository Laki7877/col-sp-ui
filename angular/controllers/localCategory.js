module.exports = ['$scope', '$rootScope', 'common', 'Category', 'LocalCategory', 'Shop', 'Alert', 'util', function($scope, $rootScope, common, Category, LocalCategory, Shop, Alert, util) {
	$scope.categories = [];
	$scope.editingStatusOptions = [	{
		text: 'Visible',
		value: true
	},
	{
		text: 'Not Visible',
		value: false
	}];
	$scope.editingForm = {};
	$scope.editingCategory = {};
	$scope.editingCategoryOriginal = {};
	$scope.popover = false;
	$scope.alert = new Alert();
	$scope.alert2 = new Alert();
	$scope.loading = false;
	$scope.dirty = false;

	$scope.treeOptions = {
		dropped: function(event) {
			if(event.pos.dirX != 0 || event.pos.dirY != 0) {
				$scope.dirty = true;
			}
		}
	};

	util.warningOnLeaveFn(function() {
		return !$scope.dirty;
	});

	$scope.init = function(shopid) {
		$scope.shopId = shopid || 1;
		$scope.reload();
	};
	$scope.reload = function() {
		$scope.loading = true;
		Shop.getLocalCategories($scope.shopId).then(function(data) {
			$scope.loading = false;
			$scope.categories = Category.transformNestedSetToUITree(data);
		}, function(err) {
			$scope.alert.open(false, common.getError(err));
			$scope.loading = false;
		});
	}
	$rootScope.$on('createLocalCategory', function(evt) {
		$scope.categories.unshift(LocalCategory.generate());
	});
	$rootScope.$on('saveLocalCategory', function(evt) {
		//Call endpoint
		$scope.alert.close();
		$scope.formData = Category.transformUITreeToNestedSet($scope.categories);
		$scope.formData = $scope.formData.map(function(item) {
			delete item['ProductCount'];
			delete item['parent'];
			return item;
		});
		Shop.upsertLocalCategories($scope.shopId, $scope.formData).then(function() {
			$scope.alert.success('Your changes have been saved.');
			$scope.dirty = false;
			$scope.reload();
		}, function(err) {
			$scope.alert.error(common.getError(err));
			$scope.reload();
		});
	});
	$rootScope.$on('saveEditLocalCategory', function(evt) {
		if($scope.editingForm.$valid) {
			if($scope.editing) {
				for (var k in $scope.editingCategory) {
					$scope.editingCategoryOriginal[k] = $scope.editingCategory[k];
				}
			} else {
				$scope.categories.unshift($scope.editingCategory);
			}

			$scope.$emit('saveLocalCategory');
			//Close modal
			$('#local-category-detail').modal('hide');
		} else {
			$scope.alert2.error('Unable to save because required fields are missing or incorrect.');
		}
	});
	$rootScope.$on('openEditLocalCategory', function(evt, node) {
		if (angular.isDefined(node)) {
			$scope.editingCategoryOriginal = node;
			$scope.editingCategory = angular.extend({}, node);
			$scope.editing = true;
		} else {
			$scope.editingCategory = LocalCategory.generate();
			$scope.editing = false;
		}
		$scope.editingForm.$setPristine();
	});
}];