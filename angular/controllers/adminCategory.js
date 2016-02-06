module.exports = ['$scope', '$rootScope', 'common', 'Category', 'GlobalCategory', 'AttributeSet', 'Alert',  function($scope, $rootScope, common, Category, GlobalCategory, AttributeSet, Alert){
	$scope.categories = [];
	$scope.attributeSetOptions = [];
	$scope.editingStatusOptions = [
	{
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

	$scope.test = function(i) {
		return angular.isUndefined(i.ProductCount) || (i.ProductCount == 0);
	};
	$scope.loading = false;

	$scope.init = function() {
		$scope.reload();
		$scope.loadAttributeSets();
	};
	$scope.loadAttributeSets = function() {
		AttributeSet.getAll().then(function(data) { 
			$scope.attributeSetOptions = data;
		});
	}
	$scope.reload = function() {
		$scope.loading = true;
		GlobalCategory.getAll().then(function(data) {
			$scope.categories = Category.transformNestedSetToUITree(data);
			$scope.loading = false;
		}, function(err) {
			$scope.loading = false;
			$scope.alert.open(false, common.getError(err));
		});
	};
	$rootScope.$on('saveGlobalCategory', function(evt) {
		//Call endpoint
		$scope.alert.close();
		$scope.formData = Category.transformUITreeToNestedSet($scope.categories);
		$scope.formData = $scope.formData.map(function(item) {
			delete item['ProductCount'];
			delete item['parent'];
			item['Commission'] = parseFloat(item['Commission']);
			return item;
		});
		$scope.loading = true;
			
		GlobalCategory.upsert($scope.formData).then(function() {
			$scope.alert.success('Your changes have been saved.');
			$scope.dirty = false;
			$scope.reload();
		}, function(err) {
			$scope.alert.error(common.getError(err));
			$scope.reload();
		});
	});
	$rootScope.$on('saveEditGlobalCategory', function(evt) {
		$scope.alert2.close();
		if($scope.editingForm.$valid) {
			//Edit or add
			$scope.loading = true;
			if($scope.editing) {
				for (var k in $scope.editingCategory) {
					$scope.editingCategoryOriginal[k] = $scope.editingCategory[k];
				}
			} else {
				$scope.categories.unshift($scope.editingCategory);
			}
			$scope.$emit('saveGlobalCategory');
			//Close modal
			$('#modal-category-detail').modal('hide');
		} else {
			$scope.alert2.error('Unable to save because required fields are missing or incorrect.');
		}
	});
	$rootScope.$on('openEditGlobalCategory', function(evt, node) {
		//Edit or add
		if (angular.isDefined(node)) {
			$scope.editingCategoryOriginal = node;
			$scope.editingCategory = angular.extend({}, node);
			$scope.editing = true;
		} else {
			$scope.editingCategory = GlobalCategory.generate();
			$scope.editing = false;
		}
		$scope.editingForm.$setPristine();
	});

}];