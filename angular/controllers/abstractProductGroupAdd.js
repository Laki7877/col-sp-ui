module.exports = function($scope, $rootScope, $controller, NcAlert,
	config, $uibModal, GlobalCategory, Category, AttributeSet, Product,
	ProductTempService, options,
	VariationFactorIndices, AttributeSetService, AttributeOptions, $productAdd,
	AdminShopService) {
	'ngInject';

	$scope.adminMode = (options.adminMode);
	$scope.alert = new NcAlert();
	$scope.loading = false;
	$scope.create = function() {

		if (!$scope.formData.DefaultVariant) {
			return $scope.alert.error("Please fill in the form.");
		}

		try {
			var fd = angular.copy($scope.formData);

			//Find default Varaint
			var text_defaultVariant = $scope.formData.DefaultVariant.text;
			var idx_defaultVariant = _.findIndex($scope.formData.Variants, function(o) {
				return o.text == text_defaultVariant
			});
			fd.Variants[idx_defaultVariant].DefaultVariant = true;
			fd.Category = {
				CategoryId: fd.Category.CategoryId
			}

			fd.Variants.map(function(o) {
				if(!o.MappedProduct){
					delete o.Pid;
					return o;
				}
				o.Pid = o.MappedProduct.Pid;
				delete o.MappedProduct;
				return o;
			});

			delete fd.MasterVariant;
			delete fd.DefaultVariant;
			//Post to server
			$scope.alert.close();
			$scope.loading = true;

			Product.savePendingProduct(fd).then(function(suc) {
				var productLink = options.adminMode ? '/admin/products' : '/products';
				$scope.alert.success("Products grouped successfully. <a href='" +
					productLink + "'>View Product List</a>");
				$scope.loading = false;
			}, function(er) {
				console.log(er);
				$scope.alert.error("Unable to group product because " + (er.Message ||
					er.message));
				$scope.loading = false;
			});
		} catch (ex) {
			return $scope.alert.error("Please make sure all fields are filled correctly.");
			$scope.loading = false;
		}
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
			ShopId: options.adminMode ? null : $rootScope.Profile.Shop.ShopId
		}
	};

	$scope.dataset = {
		Products: [],
		CombinedAttributeSets: [],
		GlobalCategoryTree: null
	};

	$scope.refresher = {};
	$scope.dataset.attributeOptions = AttributeOptions.proto();
	$scope.variationFactorIndices = new VariationFactorIndices($scope.dataset);

	$scope.groupInfoSelected = false;

	$scope.createVariationOption = function() {
		$scope.groupInfoSelected = true;
	}

	$scope.$watch('dataset.attributeOptions', function() {
		console.log("Regenerating variations");
		$productAdd.generateVariants($scope.formData, $scope.dataset);
	}, true);

	$scope.refresher.Products = function(q) {
		return Product.getUngrouped(q,
				$scope.formData.AttributeSet.AttributeSetId,
				$scope.formData.Shop.ShopId,
				$scope.formData.Category.CategoryId)
			.then(function(ds) {
				$scope.dataset.Products = ds.data;
			});
	};

	$scope.$watch('formData.AttributeSet', function(x) {
		Product.getUngrouped(null,
				$scope.formData.AttributeSet.AttributeSetId,
				$scope.formData.Shop.ShopId,
				$scope.formData.Category.CategoryId)
			.then(function(ds) {
				$scope.dataset.Products = ds.data;
			});
	}, true);

	$scope.refresher.Shops = function(q) {
		return AdminShopService.list({
			searchText: q,
			_limit: 8,
			_offset: 0,
			_direction: 'asc'
		}).then(function(ds) {
			$scope.dataset.Shops = ds.data;
		});
	};

	$scope.refresher.AttributeSets = function(q) {
		return AttributeSetService.list({
			_order: 'AttributeSetId',
			_limit: 5,
			_offset: 0,
			_direction: 'asc',
			searchText: q
		}).then(function(ds) {
			var searchRes = ds.data.map(function(d) {
				d._group = 'Search Results';
				return d;
			});
			$scope.dataset.CombinedAttributeSets = _.unionBy(searchRes, $scope.dataset
				.AttributeSets, 'AttributeSetId');
		})
	};

	GlobalCategory.list().then(function(data) {
		$scope.dataset.GlobalCategoryTree = Category.transformNestedSetToUITree(
			data);
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
