
module.exports = function ($scope, config, $uibModal, $timeout, CMSService) {

	$scope.categorys 	= [];
	$scope.isEmpty 		= false;
	$scope.loading = true;

    // model for binding
	$scope.CMSRelProductCategory = {};
	$scope.CMSCategoryModel = {
	    CMSRelProductCategory: []
	};


	$scope.params = {
		//_order: '',
		_limit: 10,
		_offset: 0,
		//_direction: '' || 'desc'
	};

	$scope.$watch('params._limit', function(newVal, oldVal) {
	    
	    if (newVal == oldVal)
	        return;

	    $scope.loadAllCategory();
	});
	$scope.$watch('params._offset', function(newVal, oldVal) {
	    
	    if (newVal == oldVal)
	        return;

	    $scope.loadAllCategory();
	});

	$scope.loadAllCategory = function () {

	    $scope.loading = true;

	    CMSService.getAll($scope.params)
        .then(function (res) {
            console.log(res)
            $scope.categorys = res.data;
            $scope.isEmpty = false;
            $scope.loading = false;
        });
	};
	$scope.loadAllCategory();

	$scope.addNewCategory = function() {

		// open modal
		$uibModal.open({
	      templateUrl: 'templates/admin-cms-category-manage.html',
	      size: 'lg',
	      scope: $scope,
	      controller: function($scope, $uibModalInstance) {

	      	$scope.products = [];
	      	$scope.isEmpty = true;
      		$scope.loading = false;
      		$scope.message = 'You do not have any Product';      		
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

	      	$scope.addProductItem = function() {
	      		// open modal
				$uibModal.open({
			      	templateUrl: 'templates/admin-cms-category-manage-add-item.html',
			      	size: 'lg',
			      	controller: function($scope, $uibModalInstance) {

			      		$scope.products = [];
			      		$scope.isEmpty = true;
			      		$scope.loading = false;
			      		$scope.message = 'You do not have any Product';

			      		$scope.search = function () {

			      		    //CMSService.searchProduct()
                            //.then(function (res) {

                            //});
			      			
			      			$scope.isEmpty = false;
			      			$scope.loading = true;

			      			$timeout(function() {
			      				$scope.loading = false;
			      				$scope.isEmpty = true;
			      				$scope.message = 'Not Found Product.';
			      			}, 1000);
			      		};

			      		$scope.ok = function() {
			      			$uibModalInstance.close($scope.products)
			      		};
			      	}
			  	})
			  	.result.then(function(result) {

			  	});
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

	$scope.detailCategory = function (item) {
	    $scope.CMSCategoryModel = {};
	    $scope.CMSCategoryModel = item;
	    console.log(item)
	    manageCategoryModal('view');
	};

	$scope.editCategory = function (item) {
	    $scope.CMSCategoryModel = {};
	    $scope.CMSCategoryModel = item;
	    console.log(item)
	    manageCategoryModal('edit');
	};

	$scope.deleteCategoey = function(item) {

	};

	function manageCategoryModal(mode) {

	    var title = 'Add New Categoey';

	    switch (mode) {
	        case 'view': title = 'Category Detail'; break;
	        case 'edit': title = 'Edit Category'; break;
	    }


	    // open modal
	    $uibModal.open({
	        templateUrl: 'templates/admin-cms-category-manage.html',
	        size: 'lg',
	        scope: $scope,
	        controller: function ($scope, $uibModalInstance) {

	            $scope.title = title;
	            $scope.products = $scope.CMSCategoryModel.CMSRelProductCategory;
	            $scope.isEmpty = $scope.products.length == 0 ? true : false;
	            $scope.loading = false;
	            $scope.message = 'You do not have any Product';
	            $scope.singleDate = moment();

	            var categoryProducts = [];

	            $scope.checkAll = function (isChecked) {

	                $scope.isCheckedAll != isChecked;

	                if (!isChecked) {
	                    angular.forEach($scope.products, function (item) {
	                        item.IsChecked = false;
	                    });
	                    categoryProducts = [];
	                }
	                else {
	                    angular.forEach($scope.products, function (item) {
	                        item.IsChecked = isChecked;
	                        categoryProducts.push(item);
	                    });
	                }
	            };

	            $scope.checkOnce = function (item, isChecked) {

	                if (!isChecked) {
	                    var index = categoryProducts.indexOf(item);
	                    if (index > -1)
	                        categoryProducts.splice(index, 1);
	                }
	                else {
	                    categoryProducts.push(item);
	                }
	            };

	            $scope.addProductItem = function () {

	                // open modal
	                $uibModal.open({
	                    templateUrl: 'templates/admin-cms-category-manage-add-item.html',
	                    size: 'lg',
	                    controller: function ($scope, $uibModalInstance) {

	                        $scope.products = [];
	                        $scope.isEmpty = true;
	                        $scope.loading = false;
	                        $scope.message = 'You do not have any Product';

	                        $scope.search = function () {

	                            $scope.isEmpty = false;
	                            $scope.loading = true;

	                            $timeout(function () {
	                                $scope.loading = false;
	                                $scope.isEmpty = true;
	                                $scope.message = 'Not Found Product.';
	                            }, 1000);
	                        };

	                        $scope.ok = function () {
	                            $uibModalInstance.close($scope.products)
	                        };
	                    }
	                })
                    .result.then(function (result) {

                    });
	            };

	            $scope.save = function (categoryName) {
	                var category = {
	                    CategoryName: categoryName,
	                    CategoryProducts: categoryProducts
	                };
	                $uibModalInstance.close(category)
	            };


	        }
	    })
	    .result.then(function (data) {
	        console.log(data)
	        $scope.categorys.push(data);
	    });
	}
}