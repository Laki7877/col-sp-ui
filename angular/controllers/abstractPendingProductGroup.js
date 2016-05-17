module.exports = function($scope, $rootScope, $controller, NcAlert,
		config, $uibModal, GlobalCategory, Category, AttributeSet, Product, ProductTempService,
		VariationFactorIndices, AttributeSetService, AttributeOptions, $productAdd) {
	'ngInject';
    
    $scope.alert = new NcAlert();
    $scope.create = function(){
        
        var fd = angular.copy($scope.formData);
        
        //One-way serialize
        
        //Find default Varaint
        var text_defaultVariant = $scope.formData.DefaultVariant.text;
        var idx_defaultVariant = _.findIndex($scope.formData.Variants, function(o){ return o.text == text_defaultVariant }); 
        fd.Variants[idx_defaultVariant].DefaultVariant = true;
        fd.Category = {
            CategoryId: fd.Category.CategoryId
        }
        
        fd.Variants.map(function(o){
           o.Pid = o.MappedProduct.Pid;
           delete o.MappedProduct;
           return o;
        });
        
        delete fd.MasterVariant;
        delete fd.DefaultVariant;
        console.log("fd", fd);
        //Post to server
        $scope.alert.close();
        
		Product.savePendingProduct(fd).then(function(suc){
            $scope.alert.success("Pending product grouped successfully.");
        }, function(er){
            console.log(er);
            $scope.alert.error("Unable to group product because " + (er.Message || er.message));
        });
	};
    
	$scope.formData = {
		Category: {
			CategoryId: null
		},
		AttributeSet: null,
		MasterVariant: {
			Pid: null,
			FirstAttribute: {},
			SecondAttribute: {},
			Visibility: true,
			DefaultVariant: false
		},
		Variants: [],
		Shop: {
			ShopId: $rootScope.Profile.Shop.ShopId
		}
	};

	$scope.dataset = {
		CombinedAttributeSets: [],
		GlobalCategoryTree: null
	};

	$scope.refresher = {};
	$scope.dataset.attributeOptions = AttributeOptions.proto();
	$scope.variationFactorIndices = new VariationFactorIndices($scope.dataset);

	$scope.groupInfoSelected = false;

	$scope.createVariationOption = function(){
		$scope.groupInfoSelected = true;
	}

	$scope.$watch('dataset.attributeOptions', function() {
		console.log("Regenerating variations");
		$productAdd.generateVariants($scope.formData, $scope.dataset);
	}, true);

	$scope.refresher.Products = function(q){
		return ProductTempService.list({
			searchText: q,
			_limit: 8,
			_offset: 0,
			_direction: 'asc'
		}).then(function(ds) {
		  $scope.dataset.Products = ds.data;
		  return ds.data;
		});
	};

	$scope.refresher.AttributeSets = function(q) {
		if (!q) return;
		$scope.refresher.AttributeSetsLoading = true;
		return AttributeSetService.list({
			_order: 'AttributeSetId',
			_limit: 5,
			_offset: 0,
			_direction: 'asc',
			searchText: q
		}).then(function(ds) {
			$scope.refresher.AttributeSetsLoading = false;
			var searchRes = ds.data.map(function(d) {
				d._group = 'Search Results';
				return d;
			});
			$scope.dataset.CombinedAttributeSets = _.unionBy(searchRes, $scope.dataset.AttributeSets, 'AttributeSetId');
		})
	};

	GlobalCategory.list().then(function(data) {
		$scope.dataset.GlobalCategoryTree = Category.transformNestedSetToUITree(data);
	});

	$scope.openCategorySelectorModal = function() {

		var modalInstance = $uibModal.open({
			size: 'category-section modal-lg column-4',
			keyboard: false,
			templateUrl: 'product/modalCategorySelector',
			controller: function($scope, $uibModalInstance, tree, model) {
				'ngInject';
				$scope.model = model;
				$scope.tree = tree;
				$scope.title = 'Select Category';
				$scope.categoryHeaderText = '';

				$scope.select = function() {
					$uibModalInstance.close($scope.model);
				};
			},
			resolve: {
				model: function() {
					return $scope.formData.Category;
				},
				tree: function() {
					return $scope.dataset.GlobalCategoryTree;
				}
			}
		});

		modalInstance.result.then(function(data) {
			$scope.formData.Category = data;
			AttributeSet.getByCategory(data.CategoryId)
				.then(function(data) {
					$scope.dataset.AttributeSets = data.map(function(aset) {
						aset._group = "Suggested Attribute Sets";
						return aset;
					});
					$scope.dataset.CombinedAttributeSets = angular.copy($scope.dataset.AttributeSets);
				});

		});

	};
}
