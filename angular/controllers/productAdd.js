var angular = require('angular');

module.exports = ['$scope', '$window', 'util', 'config', 'Product', 'Image', 'AttributeSet', 'Brand', 'Shop', 
'GlobalCategory', 'Category', 'VariantPair', 'productProxy',
	function($scope, $window, util, config, Product, ImageService, AttributeSet, Brand, Shop, 
		GlobalCategory, Category, VariantPair, productProxy){
	'use strict';

	$scope._loading = {
		state : true,
		message: 'Loading..'
	};

	$window.onbeforeunload = function (e) {
		$('#modal-warning-leave-page').modal('show');
		var message = "Are you sure you want to leave the page?",
		e = e || window.event;
		// For IE and Firefox
		if (e) {
		  e.returnValue = message;
		}

		// For Safari
		return message;
	};


	var cleanData = function(){
		if( !$scope.formData.MasterVariant.SalePrice ||
			$scope.formData.MasterVariant.SalePrice == "" ||  
			$scope.formData.MasterVariant.SalePrice == 0)
		{
			
			$scope.formData.MasterVariant.SalePrice = $scope.formData.MasterVariant.OriginalPrice;
		}

	};
	

	$scope.preview = function(){
		cleanData();
		console.log('Form Data', $scope.formData);
		var apiRequest = productProxy.transform($scope.formData);
		console.log('API JSON', JSON.stringify(apiRequest));

	};

	$scope.refreshRelatedProducts = function(q){
		return Product.getAll({
			searchText: q
		}).then(function(dataSet){
			console.log("Refreshing Related Products", dataSet);
			$scope.availableRelatedProducts = dataSet.data;
		});
	};

	$scope.refreshBrands = function(q){
		Brand.getAll({
			pageSize: 5,
			searchText: q
		}).then(function(dataSet){
			$scope.availableBrands = dataSet.data;
		});			
	};

	$scope.publish = function(Status){

		cleanData();
		console.log("Publishing with Status = ", $scope.Status);
		var apiRequest;
		try{
			console.log('Form Data', $scope.formData);
			apiRequest = productProxy.transform($scope.formData);
			console.log('API JSON', JSON.stringify(apiRequest), $scope.Status);
		}catch(ex){
			console.log(ex);
			alert("Unable to serialize data", ex);
			return;
		}

		Product.publish(apiRequest, Status).then(function(res){
				//TODO: remove this , 
				if(res.ProductId){

					$window.onbeforeunload = function(){};
					console.log("Save successful");
					$window.location.href = "/products";
				}else{
					alert("Unable to save", res);
				}

			}, function(er){
				alert("FYI - Unable to save due to error - Send this message to a wizard near you: \n\n" + JSON.stringify(er));
				console.warn("Unable to save", er);
		});

	};

	$scope.formData = {
		Brand: {},
		MasterVariant: {},
		RelatedProducts: [],
		MasterImages: [],
		MasterImages360: [],
		VideoLinks: [],
		Variants: [],
		GlobalCategories: [null, null, null],
		LocalCategories: [null, null, null],
		SEO: {},
		ControlFlags: [],
		Keywords: []
	};

	//CK editor options
	$scope.ckOptions = config.CK_DEFAULT_OPTIONS;

	var tabPage = {};
	tabPage.global = {
		load: function(){

		},
		jquery: function(){

			//TODO: this wont play well with angular, not sure why
			//maybe use this: http://dalelotts.github.io/angular-bootstrap-datetimepicker/
			$('.input-icon-calendar').datetimepicker({
				format: "LL"
			}).on('dp.change', function(sd){
				$scope.$apply();
			});

			$("body").tooltip({ selector: '[data-toggle=tooltip]' });
			
		},
		angular: function() {

			$scope.init = function(viewBag) {

				//TODO: Refactor 

				var shopId = 1;
				var angularReady = function(){
					//Angular dependent 
					//TODO : probably not needed anymore
				    tabPage.global.jquery();
				    tabPage.information.jquery();
				    loadedTabs.information = true;
					$scope._loading.message = "Done";
					$scope._loading.state = false;
				};

				var watchVariantChanges = function(){
					console.log('setting up $watch');
					$scope._loading.message = "Setting up watch..";

					$scope.$watch('attributeOptions', function(){

						var variantHashes = {};
						//Product Hash Tracking Table
						$scope.formData.Variants.forEach(function(elem, index){
							//Keep track of the index of the hashed item
							variantHashes[elem.hash] = index;
						});


						var expand = function(A,B){

							if(A['AttributeValue']){
								A = A.AttributeValue.AttributeValueEn;
							}

							var BId = null;

							if(angular.isDefined(B)){
								BId = $scope.attributeOptions[1].Attribute.AttributeId;
								if(B['AttributeValue']){
									B = B.AttributeValue.AttributeValueEn;
								}
							}else{
								B = ''
								BId = null;
							}

							var kpair = new VariantPair({
								AttributeId: $scope.attributeOptions[0].Attribute.AttributeId,
								ValueEn: A
							},{
								AttributeId: BId,
								ValueEn: B
							});

							kpair.ProductNameEn = $scope.formData.MasterVariant.ProductNameEn;
							kpair.ProductNameTh = $scope.formData.MasterVariant.ProductNameTh;

							//Only push if don't exist
							if(!(kpair.hash in variantHashes)){
								$scope.formData.Variants.push(kpair);
							}

							//Mark hash as used
							//This will not be deleted
							variantHashes[kpair.hash] = -1;
						}


						//Multiply out unmultiplied options
						if($scope.attributeOptions && Object.keys($scope.attributeOptions).length > 0){
							for(var aKey in $scope.attributeOptions[0].options){
								var A = $scope.attributeOptions[0].options[aKey];

								if(angular.isDefined($scope.attributeOptions[1].options) && 
									$scope.attributeOptions[1].options.length == 0){
									
									expand(A);
								}

								for(var bKey in $scope.attributeOptions[1].options){
									var B = $scope.attributeOptions[1].options[bKey];
									expand(A, B);
								}
							}
						}
						

						//Remove deleted variants
						for(var rhash in variantHashes){
							if(variantHashes[rhash] == -1) continue;
							$scope.formData.Variants.splice(variantHashes[rhash], 1);
						}

						$scope.formData.DefaultVariant = $scope.formData.Variants[0];
					}, true);

				}

				var loadFormData = function(ivFormData, FullAttributeSet){

					$scope._loading.message = "Crunching Data..";

					//Dependency Chain
					//catId -> AttributeSet -> Inverse

					if(!('VideoLinks' in ivFormData)){
						ivFormData['VideoLinks'] = [];
					}
					console.log("Before Inverse Transformation", ivFormData);
					var inverseResult = productProxy.inverseTransform(ivFormData, FullAttributeSet);
					$scope.formData = inverseResult.formData;
					console.log("After Inverse Transformation", $scope.formData);
					console.log('inverseResult.attributeOptions', inverseResult.attributeOptions);

					$scope.attributeOptions = inverseResult.attributeOptions || $scope.attributeOptions;

				};

				var catReady = function(catId, ivFormData, callback){
					//Dependecy chain
					// catId

					$scope._loading.message = "Downloading Attribute Sets..";

					AttributeSet.getByCategory(catId).then(function(data){
						$scope.availableAttributeSets = data;
						//TODO: Mock for fun
						// if(data.length > 0) $scope.formData.AttributeSet = data[0];

						//Load Attribute Set (edit mode only, in add mode AttributeSet is not set)
						if(ivFormData.AttributeSet && ivFormData.AttributeSet.AttributeSetId){

							$scope._loading.message = "Indexing..";

							var idx = $scope.availableAttributeSets.map(function(o){
								return o.AttributeSetId
							}).indexOf(ivFormData.AttributeSet.AttributeSetId);

							console.log("idx", idx);
						
							
						}

						if(ivFormData.ProductId){
							$scope.formData.AttributeSet = $scope.availableAttributeSets[idx];
							loadFormData(ivFormData, $scope.formData.AttributeSet);
						}
 
						//Load Global Cat
						GlobalCategory.getAll().then(function(data) {

							$scope._loading.message = "Downloading Category Tree..";
							$scope.availableGlobalCategories = Category.transformNestedSetToUITree(data);
							$scope.formData.GlobalCategories[0] = Category.findByCatId(catId, $scope.availableGlobalCategories);
							$scope.globalCategoryBreadcrumb = Category.createCatStringById(catId, $scope.availableGlobalCategories);
							callback();
						});


						watchVariantChanges();
					});
				};

				if("productId" in viewBag){
					//EDIT MODE

					var productId = viewBag.productId;
					$scope._loading.message = "Downloading Product..";
					Product.getOne(productId).then(function(ivFormData){
						var gcat = ivFormData.GlobalCategory;
						catReady(gcat, ivFormData, function(){

							$scope.formData.ProductId = Number(productId);
							//Load Brand
							$scope._loading.message = "Downloading Brand..";

							Brand.getOne($scope.formData.Brand.BrandId).then(function(data){
									$scope.formData.Brand = data;
									delete $scope.formData.Brand.$id;
									$scope.formData.Brand.id = $scope.formData.Brand.BrandId;
									//MUST HAPPEN LAST
									angularReady();
							}, function(){
									console.log("resolve failure", $scope.formData);
									angularReady();
							});

						});

						//auxiliary object (non-persist)
						// $scope.attributeOptions[0] = $scope.formData.Variants[0].FirstAttribute;

					});
				}

				if("catId" in viewBag){
					//ADD MODE
					$scope._loading.state = false;
					catReady(viewBag.catId, {}, angularReady);
					watchVariantChanges();
				}

				//Load Local Cat
				Shop.getLocalCategories(shopId).then(function(data) {
					$scope.availableLocalCategories = Category.transformNestedSetToUITree(data);
				});
			}

			//Attribute Options to be filled via API
			$scope.availableAttributeSets = [];
			$scope.availableGlobalCategories = [];
			$scope.availableLocalCategories = [];
			$scope.availableBrands = [];
			$scope.availableSearchTags = ["Eneloop", "Extra Battery"];
			$scope.availableRelatedProducts = [];
			$scope.availableStockTypes = ['Stock', 'Pre-Order'];

			//TODO: Change _attrEnTh(t) to _attrEnTh(Name, t)
			$scope._attrEnTh = function(t){ return t.AttributeSetNameEn + " / " + t.AttributeSetNameTh; }
			$scope._isFreeTextInput = util.isFreeTextDataType;
			$scope._isListInput = util.isListDataType;
		}
	};

	tabPage.information = {
		load: function(){
			//Call Load and Load will determine which part will be called
		},
		jquery: function(){
			//NOTE: as of now this is only called in EDIT mode
			//TODO: which is wrong

		},
		angular: function() {}
	};

	tabPage.images = {
		jquery: function() {

		},
		angular: function() {

		    $scope.uploader = ImageService.getUploader('/ProductImages', {
		    	queueLimit: 20
		    });
		    $scope.uploader360 = ImageService.getUploader('/ProductImages', {
				queueLimit: 60
		    });

		    //Assign uploader images
		    ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages);
		    ImageService.assignUploaderEvents($scope.uploader360, $scope.formData.MasterImages360);

		    /**
		     * IMAGE THUMBNAIL EVENTS
		     */
		    $scope.$on('left', function(evt, item, array, index) {
		    	var to = index - 1;
		    	if(to < 0) to = array.length - 1;

		    	var tmp = array[to];
		    	array[to] = item;
		    	array[index] = tmp;
		    });
		    $scope.$on('right', function(evt, item, array, index) {
		    	var to = index + 1;
		    	if(to >= array.length) to = 0;

		    	var tmp = array[to];
		    	array[to] = item;
		    	array[index] = tmp;
		   	});
		   	$scope.$on('delete', function(evt, item, array, index, uploader) {
				angular.forEach(uploader.queue, function(i) {
					if(i.indx == indx) {
						i.remove();
						i.cancel();
					}
				});
		   		array.splice(index, 1);
		   	});
		   	$scope.$on('zoom', function(evt, item, array, index) {
		   		//Should use angular way, but ok whatever
		        $('#product-image-zoom img').attr('src', item.url);
		        $('#product-image-zoom').modal('show');
		   	});
		}
	};
	tabPage.category = {
		jquery: function() {

		},
		angular: function() {
			//For viewing only
			$scope.viewCategoryColumns = [];
			$scope.viewCategorySelected = null;
			$scope.viewCategoryIndex = 0;
			$scope.selectCategory = angular.noop;

			//Events
			$scope.$on('openGlobalCat', function(evt, item, indx) {
				$scope.viewCategoryColumns = Category.createColumns(item, $scope.availableGlobalCategories);
				$scope.viewCategorySelected = item;
				$scope.viewCategoryIndex = indx;
				$scope.selectCategory = Category.createSelectFunc($scope.viewCategoryColumns, function(selectedItem) {
					$scope.viewCategorySelected = selectedItem;
				});
			});
			$scope.$on('deleteGlobalCat', function(evt, indx) {
				$scope.formData.GlobalCategories[indx] = null;
			});
			$scope.$on('selectGlobalCat', function(evt, row, indx, parentIndx) {
				$scope.selectCategory(row, indx, parentIndx);
			});
			$scope.$on('saveGlobalCat', function(evt) {
				$scope.formData.GlobalCategories[$scope.viewCategoryIndex] = $scope.viewCategorySelected;
			});

			//Events
			$scope.$on('openLocalCat', function(evt, item, indx) {
				$scope.viewCategoryColumns = Category.createColumns(item, $scope.availableLocalCategories);
				$scope.viewCategorySelected = item;
				$scope.viewCategoryIndex = indx;
				$scope.selectCategory = Category.createSelectFunc($scope.viewCategoryColumns, function(selectedItem) {
					$scope.viewCategorySelected = selectedItem;
				});
			});
			$scope.$on('deleteLocalCat', function(evt, indx) {
				$scope.formData.LocalCategories[indx] = null;
			});
			$scope.$on('selectLocalCat', function(evt, row, indx, parentIndx) {
				$scope.selectCategory(row, indx, parentIndx);
			});
			$scope.$on('saveLocalCat', function(evt) {
				$scope.formData.LocalCategories[$scope.viewCategoryIndex] = $scope.viewCategorySelected;
			});
		}
	}
	
	tabPage.variation = {
		initSelect2: function(index){
			var isListInput	= false;
			if($scope.attributeOptions[index].attribute){
				isListInput = ($scope._isListInput($scope.attributeOptions[index].Attribute.Attribute.DataType));
			}
		},
		jquery: function(){
		},
		angular: function() {
			//Unmultiplied Variants (factor)
			$scope.attributeOptions = {
				0: {
					Attribute: false,
					options: []
				},
				1: {
					Attribute: false,
					options: []
				}
			};

			//TODO: When selected attribute change,
			//the other box wil not allow to have selected option

		   	/**
		   	 * This part handles when user click on More Detail and open pair form
		   	 */
			$scope.uploaderModal = ImageService.getUploader('/ProductImages');
		   	$scope.$on('openPairModal', function(evt, pair, array, index){
		   		//Define if not defined
		   		if(angular.isUndefined(pair.Images)) {
		   			pair.Images = [];
		   		}
		   		if(angular.isUndefined(pair.queue)) {
		   			pair.queue = [];
		   		}
		   		//Modal target (for viewing pair)
		   		$scope.pairModal = angular.copy(pair);
		   		$scope.pairIndex = index;
		   		$scope.uploaderModal.queue = $scope.pairModal.queue;
			   	ImageService.assignUploaderEvents($scope.uploaderModal, $scope.pairModal.Images);
		   	});
		   	$scope.$on('savePairModal', function(evt){
		   		$scope.formData.Variants[$scope.pairIndex] = $scope.pairModal;
		   	});
		}
	};
	tabPage.more_option = {
		jquery: function() {

		},
		angular: function() {

		}
	}

	//Initialize Angular stuff
	tabPage.global.angular();
	for (var page in tabPage) {
		tabPage[page].angular();
	}

	var loadedTabs = {};

	//init tab jquery
	$(document).on('shown.bs.tab shown', function(tab){
		var pageId = tab.target.dataset.id;
		if(pageId in loadedTabs) return;
		console.log(tab, loadedTabs);
		console.log("initing ", pageId);
	    tabPage[pageId].jquery();
	    loadedTabs[pageId] = true;
	});

}];
