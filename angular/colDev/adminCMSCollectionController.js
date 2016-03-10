
module.exports = function($scope, config, $uibModal) {

	$scope.categorys = [];

	$scope.params = {
		_order: '',
		_limit: 10,
		_offset: 0,
		_direction: '' || 'desc'
	};

	$scope.$watch('params._limit', function(newVal, oldVal) {
		console.log(newVal)
	});
	$scope.$watch('params._offset', function(newVal, oldVal) {
		console.log(newVal)
	});

	$scope.loadAllCategory = function() {
		// call api

	};

	$scope.addNewCollection = function() {

		// open modal
		$uibModal.open({
	      templateUrl: 'templates/admin-cms-collection-manage.html',
	      size: 'lg',
	      scope: $scope,
	      controller: function($scope, $uibModalInstance) {

	      	$scope.products = [
	      		{ ProductName: 'P1' },
	      		{ ProductName: 'P2' },
	      		{ ProductName: 'P3' },
	      	];
	      	
	      	$scope.singleDate = moment();
	      	var categoryProducts = [];

	      	$scope.checkAll = function(isChecked) {
	      		
	      		$scope.isCheckedAll != isChecked;

	      		if (!isChecked) {
	      			angular.forEach($scope.products, function(item) {
		      			item.IsChecked = false;
		      		});
	      			categoryProducts = [];
	      		}
	      		else {
		      		angular.forEach($scope.products, function(item) {
		      			item.IsChecked = isChecked;
				        categoryProducts.push(item);
		      		});
	      		}
	      	};

	      	$scope.checkOnce = function(item, isChecked) {
	      		
	      		if (!isChecked) {
	      			var index = categoryProducts.indexOf(item);
	      			if (index > -1)
	      				categoryProducts.splice(index, 1);
	      		}
	      		else {
	      			categoryProducts.push(item);
	      		}
	      	};

	        $scope.save = function(categoryName) {
	        	var category = {
	        		CategoryName: categoryName,
	        		CategoryProducts: categoryProducts
	        	};
	          $uibModalInstance.close(category)
	        };

	        
	      }
	    })
	    .result.then(function(data) {
	      console.log(data)
	      $scope.categorys.push(data);
	    });
	};

	$scope.detailCategory = function(item) {
		alert(item.CategoryName)
	};

	$scope.editCategory = function(item) {

	};

	$scope.deleteCategoey = function(item) {

	};
}