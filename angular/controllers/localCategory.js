module.exports = ['$scope', '$rootScope', 'common', 'Category', 'LocalCategory', 'Shop', function($scope, $rootScope, common, Category, LocalCategory, Shop) {
	$scope.categories = [];
	$scope.editingStatusOptions = [	{
		text: 'Visible',
		value: 'AT'
	},
	{
		text: 'Not Visible',
		value: 'NA'
	}];
	$scope.editingForm = {};
	$scope.editingCategory = {};
	$scope.editingCategoryOriginal = {};
	$scope.popover = false;
	$scope.alert = {
		type: 'red',
		show: false,
		close: function() {
			this.show = false;
		},
		open: function(success, msg) {
			this.type = success ? 'green' : 'red';
			this.message = success ? 'Your change has been saved.' : msg; 
			this.show = true;
		},
		message: ''
	};

	$scope.init = function(shopid) {
		$scope.shopId = shopid || 1;
		$scope.reload();
	};
	$scope.reload = function() {
		Shop.getLocalCategories($scope.shopId).then(function(data) {
			$scope.categories = Category.transformNestedSetToUITree(data);
		}, function(err) {
			$scope.alert.open(false, common.getError(err));
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
			$scope.alert.open(true);
			$scope.reload();
		}, function(err) {
			$scope.alert.open(false, common.getError(err));
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