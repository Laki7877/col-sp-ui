module.exports = ['$scope', '$rootScope', 'common', 'Category', 'LocalCategory', 'Shop', function($scope, $rootScope, common, Category, LocalCategory, Shop) {
	$scope.categories = [];
	$scope.editingStatusOptions = [{
		text: 'Hide',
		value: 'NV'
	},
	{
		text: 'Show',
		value: 'VI'
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
		Shop.getLocalCategories($scope.shopId).then(function(data) {
			$scope.categories = Category.transformNestedSetToUITree(data);
		}, function(err) {
			$scope.alert.open(false, common.getError(err));
		});
	};
	$rootScope.$on('createLocalCategory', function(evt) {
		$scope.categories.push(LocalCategory.generate());
	});
	$rootScope.$on('saveLocalCategory', function(evt) {
		//Call endpoint
		$scope.formData = Category.transformUITreeToNestedSet($scope.categories);
		$scope.formData = $scope.formData.map(function(i) {
			delete i['ProductCount'];
			return i;
		});
		Shop.upsertLocalCategories($scope.shopId, formData).then(function() {
			$scope.alert.open(true);
		}, function(err) {
			$scope.alert.open(false, common.getError(err));
		});
	});
	$rootScope.$on('saveEditLocalCategory', function(evt) {
		$scope.editingForm.$setSubmitted();
		if($scope.editingForm.$valid) {
			for (var k in $scope.editingCategory) {
				$scope.editingCategoryOriginal[k] = $scope.editingCategory[k];
			}
		}
	});
	$rootScope.$on('openEditLocalCategory', function(evt, node) {
		$scope.editingCategoryOriginal = node;
		$scope.editingCategory = angular.extend({}, node);
		$scope.editingForm.$setPristine();
		$scope.editingForm.$setUntouched();
	});
}];