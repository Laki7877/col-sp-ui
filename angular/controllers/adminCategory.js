module.exports = ['$scope', '$rootScope', 'common', 'Category', 'GlobalCategory', 'AttributeSet',  function($scope, $rootScope, common, Category, GlobalCategory, AttributeSet){
	$scope.categories = [];
	$scope.attributeSetOptions = [];
	$scope.editingStatusOptions = [
	{
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
		GlobalCategory.getAll().then(function(data) {
			$scope.categories = Category.transformNestedSetToUITree(data);
			console.log($scope.categories);
		}, function(err) {
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

		console.log($scope.formData);
			
		GlobalCategory.upsert($scope.formData).then(function() {
			$scope.alert.open(true);
			$scope.reload();
		}, function(err) {
			$scope.alert.open(false, common.getError(err));
			$scope.reload();
		});
	});
	$rootScope.$on('saveEditGlobalCategory', function(evt) {
		if($scope.editingForm.$valid) {
			//Edit or add
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