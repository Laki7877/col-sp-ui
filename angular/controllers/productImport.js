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
			controller: function($scope, $uibModalInstance, $timeout, file, uploader, title) {
				'ngInject';
				$scope.file = file;
				$scope.file.upload();
				$scope.server = 0;
				$scope.title = title;
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
				},
				title: function() {
					return $scope.modalTitle;
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
		$scope.title = 'Import - Add Products'
		$scope.modalTitle = 'Adding New Products...';
		$scope.update = false;

		//Update only
		if(!_.isNil(update) && update) {
			$scope.method = 'PUT';
			$scope.title = 'Import - Update Products';
			$scope.modalTitle = 'Updating Products...';
			$scope.update = true;
		}

		$scope.uploader = FileService.getUploader('/ProductStages/Import', {
			method: $scope.method
		});
		$scope.uploader.filters.push({ name: 'sizeFilter', fn:function(item) { return item.size <= config.MAX_IMAGE_UPLOAD_SIZE; } });
		$scope.uploader.onSuccessItem = function(item, response) {
			$scope.importingFile = null;
			storage.put('import.success', response);
			$timeout(function() {
				$window.location.href='/products';
			},0);
		};

		//Return list of error
		$scope.uploader.onErrorItem = function(item, response, status, headers) {
			console.log(item, response, status, headers);

			$scope.importingFile = null;
			response = _.map(response, function(e) {
				return '<li>' + e + '</li>';
			});
			$scope.alert.error('<span class="font-weight-bold">Fail to upload CSV</span>' + '<ul>' + response.join('') + '</ul>');

            if(status == 401) {
                //Catch Forbidden
                storage.put('redirect', $window.location.pathname);
                storage.put('session_timeout');
                storage.clear();

                $window.location.href = "/login";
            }
            if(status == 403) {
                storage.put('redirect', $window.location.pathname);
                storage.put('access_denied');
                storage.clear();

                $window.location.href = "/login";
            }

		};

		$scope.uploader.onWhenAddingFileFailed = function(item, filter) {
			$scope.alert.close();
			if(filter.name == 'sizeFilter') {
				$scope.alert.error('Import failed. File size is larger than maximum file size of 5MB.');
			}
		}

		$scope.uploader.onAfterAddingFile = function(item, response, status, headers) {
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
			var fileName = "ImportTemplate.csv";
			var file = new Blob([data], {type: 'application/octet-stream'});
			var fileURL = URL.createObjectURL(file);
			var a = document.getElementById("download_template_btn");
			
			if(window.navigator.msSaveOrOpenBlob){
				//Handle IE
				window.navigator.msSaveOrOpenBlob(file, fileName);
			}
			else{
				//File saver API
				console.log("using save As")
				saveAs(file, fileName);
			}

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

	$scope.$watch('ctrl.BrandSearch', function() {
		BrandService.list({
			searchText: $scope.ctrl.BrandSearch,
			_limit: 16
		})
		.then(function(data) {
			$scope.ctrl.Brands = _.map(data.data, function(e) {
				return e.BrandNameEn;
			});
		});
	});
};