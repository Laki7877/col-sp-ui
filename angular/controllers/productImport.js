module.exports = function($scope, $window, NcAlert, $uibModal, BrandService, GlobalCategoryService, LocalCategoryService, FileService, Product, GlobalCategoryService, Category, AttributeSet, storage, config, $timeout) {
	'ngInject';
	//Select Global Category
	$scope.ctrl = {};
	$scope.ctrl.globalCat = null;
	$scope.dataSet = {};
	$scope.dataSet.attributeSets = [];
	$scope.attributeSetLoading = false;
	$scope.importingFile = null;
	$scope.DownloadBtnText = {text: "Download", disabled: false};
	$scope.alert = new NcAlert();
	$scope.yesNoOptions = config.DROPDOWN.YES_NO_DROPDOWN;
	$scope.dataTypeOptions = config.DROPDOWN.DATA_TYPE_DROPDOWN;

	//Import function
	$scope.import = function() {
		if($scope.uploader.length == 0) return;
		$scope.alert.close();
		$scope.importingFile = $scope.uploader.queue[$scope.uploader.queue.length-1];
		var modal = $uibModal.open({
			size: 'size-warning',
			keyboard: false,
			backdrop: 'static',
			templateUrl: 'product/modalImportProgress',
			controller: function($scope, $uibModalInstance, $timeout, file, uploader) {
				$scope.file = file;
				$scope.file.upload();
				$scope.server = 0;
				$scope.$watch('file.isUploaded', function(val) {
					$scope.server = 1;
					if(val) {
						$timeout(function() {
							$uibModalInstance.close();
						}, 500);
					}
				});
			},
			resolve: {
				file: function() {
					return $scope.importingFile;
				},
				uploader: function() {
					return $scope.uploader;
				}
			}
		});
		modal.result.then(function() {
			//Successfully upload
		}, function() {
			//Cancel upload
			$scope.importingFile.cancel();
			$scope.importingFile = null;
		});
	};

	//Get file uploader
	$scope.init = function(update) {
		//Import new
		$scope.method = 'POST';
		$scope.title = 'Import - Add New Products'
			$scope.update = false;

		//Update only
		if(!_.isNil(update) && update) {
			$scope.method = 'PUT';
			$scope.title = 'Import - Update Products';
			$scope.update = true;
		}

		$scope.uploader = FileService.getUploader('/ProductStages/Import', {
			method: $scope.method
		});
		$scope.uploader.onSuccessItem = function(item, response) {
			$scope.importingFile = null;
			storage.put('import.success', response);
			$timeout(function() {
				$window.location.href='/products';
			},0);
		};

		$scope.uploader.onProgressAll = function(progress) {
		};

		//Return list of error
		$scope.uploader.onErrorItem = function(item, response, status, headers) {
			$scope.importingFile = null;
			response = _.map(response, function(e) {
				return '<li>' + e + '</li>';
			});
			$scope.alert.error('<span class="font-weight-bold">Fail to upload CSV</span>' + '<ul>' + response.join('') + '</ul>');
		};

		$scope.uploader.onAfterAddingFile = function(item) {
			$scope.uploader.queue.unshift();
		};
	}

	//Fetch Attribute set
	var fetchAttributeSet = function(cid){
		$scope.attributeSetLoading = true;
		AttributeSet.getByCategory(cid)
			.then(function(alist){
				if(cid != $scope.ctrl.globalCat.CategoryId) return;
				$scope.dataSet.attributeSets = alist;
			}).finally(function() {
				$scope.attributeSetLoading = false;
			});
	}

	//Category change, refetch
	$scope.$watch('ctrl.globalCat.CategoryId', function(){
		if(!$scope.ctrl.globalCat) return;
		if(!$scope.ctrl.globalCat.CategoryId) return;
		fetchAttributeSet(Number($scope.ctrl.globalCat.CategoryId));
	});

	//Search column head
	$scope.ctrl.AttributeSet = [];
	$scope.TYPEAHEAD_DELAY = config.TYPEAHEAD_DELAY;

	//Get column head by search
	$scope.getGuideline = function(val) {
		return Product.guideline({searchText: val, _limit: config.TYPEAHEAD_IMPORT_GUIDELINE_LIMIT})
			.then(function(response) {
				return response;
			});
	};

	$scope.onSearchSelect = function() {
		//Clear stuff
		$scope.ctrl.BrandSearch = '';
		$scope.ctrl.GlobalCategory = null;
		$scope.ctrl.LocalCategory = null;
	};

	//Download a template
	$scope.downloadTemplate = function(){
		$scope.DownloadBtnText = {
			text: "Generating..",
			disabled: true
		};
		Product.downloadTemplate(_.pick($scope.ctrl.globalCat, ['CategoryId']), $scope.ctrl.attributeSet).then(function(data){
			$scope.DownloadBtnText = {
				text: "Download",
				disabled: false
			};
			var file = new Blob([data], {type: 'application/csv'});
			var fileURL = URL.createObjectURL(file);
			var a = document.getElementById("download_template_btn");
			a.href = fileURL;
			a.click();
		});
	};


	//Open cat selector modal
	$scope.openCategoryModal = function(global) {
		var tree = [];
		var model = [];
		var title = '';

		if(global) {
			tree = $scope.ctrl.GlobalCategoryTree;
			model = $scope.ctrl.GlobalCategory;
			title = 'Global Category';
		} else {
			tree = $scope.ctrl.LocalCategoryTree;
			model = $scope.ctrl.LocalCategory;
			title = 'Local Category';
		}

		//Open modal
		var modalInstance = $uibModal.open({
			size: 'category-section modal-lg column-4',
			keyboard: false,
			templateUrl: 'product/modalCategorySelector',
			controller: function($scope, $uibModalInstance, tree, model, title) {
				'ngInject';
				$scope.model = model;
				$scope.tree = tree;
				$scope.title = title;

				$scope.select = function() {
					$uibModalInstance.close($scope.model);
				};
			},
			resolve: {
				model: function() {
					return model;
				},
				tree: function() {
					return tree;
				},
				title: function() {
					return title;
				}
			}
		});

		modalInstance.result.then(function(data) {
			if(global) {
				$scope.ctrl.GlobalCategory = data;
				GlobalCategoryService.get(data.CategoryId)
					.then(function(cat) {
						$scope.ctrl.AttributeSets = cat.AttributeSets;
					});
			} else {
				$scope.ctrl.LocalCategory = data;
			}
		});
	};

	//Load Categories
	GlobalCategoryService.list()
		.then(function(data) {
			$scope.ctrl.GlobalCategoryTree = Category.transformNestedSetToUITree(data);
		});

	LocalCategoryService.list()
		.then(function(data) {
			$scope.ctrl.LocalCategoryTree = Category.transformNestedSetToUITree(data);
		});

	BrandService.list()
		.then(function(data) {
			$scope.ctrl.Brands = _.map(data, function(e) {
				return e.BrandNameEn;
			});
		});
};
