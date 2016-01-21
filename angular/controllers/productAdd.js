var angular = require('angular');

module.exports = ['$scope', '$window', 'util', 'config', 'Product', 'Image', 'AttributeSet', 'Brand', 'Shop',
'GlobalCategory', 'Category', 'VariantPair',
	function($scope, $window, util, config, Product, ImageService, AttributeSet, Brand, Shop,
		GlobalCategory, Category, VariantPair){
	'use strict';

	$scope.alert = {
		success: false,
		failure: false,
		validationFailed: false,
		reset: function(){
			$scope.alert.success = false;
			$scope.alert.failure = false;
			$scope.alert.validationFailed = false;
		}
	};

	$scope._loading = {
		state : true,
		message: 'Loading..'
	};

	$scope.enableProductVariations = "disable";

	$window.onbeforeunload = function (e) {
		if(!$scope.addProductForm.$dirty){
			//not dirty
			return null;
		}
		var message = "Your changes will not be saved.",
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

		if($scope.formData.ExpireDate){
			var cpdate = angular.copy($scope.formData.ExpireDate);
			if(moment.isDate(cpdate)){
				$scope.formData.ExpireDate = moment(cpdate).format('LL');
				$scope.formData.ExpireTime = moment(cpdate).format('HH:mm');
			}else{
				$scope.formData.ExpireDate = "";
				$scope.formData.ExpireTime = "";
			}
		}

		if($scope.formData.EffectiveDate){
			var cpdate = angular.copy($scope.formData.EffectiveDate);
			if(moment.isDate(cpdate)){
				$scope.formData.EffectiveDate = moment(cpdate).format('LL');
				$scope.formData.EffectiveTime = moment(cpdate).format('HH:mm');
			}else{
				$scope.formData.EffectiveDate = "";
				$scope.formData.EffectiveTime = "";
			}
		}


	};


	$scope.preview = function(){
		cleanData();
		var apiRequest = Product.serialize($scope.formData);
		console.log(JSON.stringify(apiRequest));

	};

	$scope.refreshRelatedProducts = function(q){
		return Product.getAll({
			searchText: q
		}).then(function(dataSet){
			$scope.availableRelatedProducts = dataSet.data;
		});
	};

	$scope.refreshBrands = function(q){
		console.log("Refreshing brand with", q);
		//if(q == "" || !q) return;
		Brand.getAll({
			pageSize: 6,
			searchText: q
		}).then(function(dataSet){
			$scope.availableBrands = dataSet.data;
		});
	};

	$scope.publish = function(Status){

		$scope._loading.state = true;
		$scope._loading.message = "Saving changes";

		$scope.onPublishing = (Status == "WA");
		if($scope.addProductForm.$invalid){
			//replace with .hash
			$scope._loading.state = false;
			$window.location.href = $window.location.href + '#alert-validation'
			$scope.alert.validationFailed = true;
			return;
		}

		$scope.alert.reset();

		cleanData();
		console.log("Publishing with Status = ", Status);
		try{
			console.log(JSON.stringify(apiRequest));
			var apiRequest = Product.serialize($scope.formData);
			Product.publish(apiRequest, Status).then(function(res){
				if(res.ProductId){
					$scope._loading.state = false;
					$scope.alert.success = true;
					$scope.formData.ProductId = res.ProductId;
					//TODO: add in deserializer
					$scope.formData.MasterVariant.Pid = res.MasterVariant.Pid;

					$scope.addProductForm.$setPristine(true)

				}else{
					console.warn("Unable to save because API did not send back ProductId. Anticipates ProductId as success condition.")
					$scope.alert.failure = true;
				}

			}, function(er){
				$scope.alert.failure = true;
				console.warn("Unable to save due to serialization ?", er);
			});

		}catch(ex){
			console.log(ex);
			alert("Error - Unable to serialize data", ex);
			return;
		}



	};

	$scope.variationFactorIndices = {};
	$scope.variationFactorIndices.iterator = [0];
	$scope.variationFactorIndices.length = function(){
		return $scope.variationFactorIndices.iterator.length;
	}
	$scope.variationFactorIndices.popSecond = function(){
		$scope.variationFactorIndices.length() == 2 && $scope.variationFactorIndices.iterator.pop();
		$scope.attributeOptions[1].options = [];
	}
	$scope.variationFactorIndices.pushSecond = function(){
		$scope.variationFactorIndices.length() < 2 && $scope.variationFactorIndices.iterator.push(1);
	}

	$scope.formData = {
		Brand: {
			id: null,
			BrandNameEn: "Please select brand.."
		},
		MasterVariant: {
			DimensionUnit: "MM",
			WeightUnit: "G",
			StockType: "Stock"
		},
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

					$scope.$watch('attributeOptions', function(){

						var vHashSet = {};
						var prevVariants = angular.copy($scope.formData.Variants);
						prevVariants.forEach(function(elem, index){
							vHashSet[elem.text] = prevVariants[index];
						});

						prevVariants = undefined;

						$scope.formData.Variants = [];

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

							//Initialize
							kpair.ProductNameEn = $scope.formData.MasterVariant.ProductNameEn;
							kpair.ProductNameTh = $scope.formData.MasterVariant.ProductNameTh;
							kpair.Display = $scope.availableVariantDisplayOption[0];
							kpair.Visibility = true;

							if(kpair.text in vHashSet){
								//Replace with value from vHashSet
								kpair = vHashSet[kpair.text];
							}

							//Only push new variant if don't exist
							$scope.formData.Variants.push(kpair);

							//Mark hash as used
							//This will not be deleted
							//variantHashes[kpair.hash] = -1;
						}


						console.log("Recalculating Factors", $scope.attributeOptions);
						//Multiply out unmultiplied options
						if($scope.attributeOptions && Object.keys($scope.attributeOptions).length > 0){
							for(var aKey in $scope.attributeOptions[0].options){
								var A = $scope.attributeOptions[0].options[aKey];

								if(angular.isDefined($scope.attributeOptions[1]['options']) && $scope.attributeOptions[1].options.length == 0){
									console.log("expanding A");
									expand(A);
								}

								for(var bKey in $scope.attributeOptions[1].options){
									var B = $scope.attributeOptions[1].options[bKey];
									console.log("Expanding A,B");
									expand(A, B);
								}
							}
						}

						$scope.formData.DefaultVariant = $scope.formData.Variants[0];
					}, true);

				}

				var loadFormData = function(ivFormData, FullAttributeSet){

						$scope._loading.message = "Processing..";
						//Dependency Chain
						//catId -> AttributeSet -> Inverse
						if(!('VideoLinks' in ivFormData)){
							ivFormData['VideoLinks'] = [];
						}
						var inverseResult = Product.deserialize(ivFormData,
						FullAttributeSet,
						$scope._loading);

						$scope.formData = inverseResult.formData;
						console.log("After Inverse Transformation", $scope.formData, inverseResult.attributeOptions);

						if($scope.formData.Variants.length  > 0){
							$scope.enableProductVariations = "enable";
						}

						$scope.attributeOptions = inverseResult.attributeOptions || $scope.attributeOptions;

						if($scope.attributeOptions[1].options.length > 0) $scope.variationFactorIndices.pushSecond();
		    		ImageService.assignUploaderEvents($scope.uploader, $scope.formData.MasterImages);
		    		ImageService.assignUploaderEvents($scope.uploader360, $scope.formData.MasterImages360);

				};

				var catReady = function(catId, ivFormData, callback){
					//Dependecy chain
					// catId

					$scope._loading.message = "Downloading Attribute Sets..";

					AttributeSet.getByCategory(catId).then(function(data){

						//remove complex structure we dont need
						$scope.availableAttributeSets = data.map(function(aset){

							aset.AttributeSetTagMaps = aset.AttributeSetTagMaps.map(function(asti){
								return asti.Tag.TagName;
							});

							aset.AttributeSetMaps = aset.AttributeSetMaps.map(function(asetmapi){
								asetmapi.Attribute.AttributeValueMaps = asetmapi.Attribute.AttributeValueMaps.map(function(value){
									return value.AttributeValue.AttributeValueEn;
								});

								return asetmapi;
							});

							return aset;
						});

						//Load Attribute Set (edit mode only, in add mode AttributeSet is not set)
						if(ivFormData.AttributeSet && ivFormData.AttributeSet.AttributeSetId){

							$scope._loading.message = "Indexing..";

							var idx = $scope.availableAttributeSets.map(function(o){
								return o.AttributeSetId
							}).indexOf(ivFormData.AttributeSet.AttributeSetId);

							$scope.formData.AttributeSet = $scope.availableAttributeSets[idx];
						}

						if(ivFormData.ProductId){
								loadFormData(ivFormData, $scope.formData.AttributeSet);
						}

						$scope._loading.message = "Downloading Category Tree..";
						//Load Global Cat
						GlobalCategory.getAll().then(function(data) {

							$scope.availableGlobalCategories = GlobalCategory.getAllForSeller(Category.transformNestedSetToUITree(data));
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
							angularReady();
						});

						//auxiliary object (non-persist)
						// $scope.attributeOptions[0] = $scope.formData.Variants[0].FirstAttribute;
					}, function(){
						$window.onbeforeunload = function(){};
						$window.location.href = "/products";
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
			$scope.availableSearchTags = [];
			$scope.availableRelatedProducts = [];
			$scope.availableStockTypes = ['Stock', 'Pre-Order'];
			$scope.availableVariantDisplayOption = [{
				text: 'Show as group of variants',
				value: 'GROUP'
			},{
				text: 'Show as individual product',
				value: 'INDIVIDUAL'
			}];

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
		   	$scope.$on('delete', function(evt, item, array, index) {
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
				console.log('openGloCat', item, $scope.availableGlobalCategories);
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
				console.log(item, $scope.availableLocalCategories);
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
	    tabPage[pageId].jquery();
	    loadedTabs[pageId] = true;
	});

}];
