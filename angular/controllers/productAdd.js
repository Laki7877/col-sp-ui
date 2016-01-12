var angular = require('angular');

module.exports = ['$scope','util', 'config', 'Product', 'Image', 'AttributeSet', 'Brand', 'Shop', 'GlobalCategory', 'Category', 'VariantPair', 'productProxy',
	function($scope, util, config, Product, ImageService, AttributeSet, Brand, Shop, GlobalCategory, Category, VariantPair, productProxy){
	'use strict';

	$scope.publish = function(isValid){
		console.log('formData', $scope.formData);
		var apiRequest = productProxy.productTransform($scope.formData);
		console.log('apiRequest', apiRequest);
		console.log('aJSON', JSON.stringify(apiRequest));
		Product.publish(apiRequest, $scope.Status).then(function(){
			console.log("Save successful");
		}, function(er){
			console.warn("Unable to save", er);
		});
	};

	$scope.formData = {
		MasterVariant: {},
		MasterImages: [],
		MasterImages360: [],
		VideoLinks: [],
		Variants: [],
		GlobalCategories: [null, null, null],
		LocalCategories: [null, null, null],
		SEO: {},
		ControlFlags: []
	};

	//CK editor options
	$scope.ckOptions = config.CK_DEFAULT_OPTIONS;

	/**
	 * All Tabs
	 * Seperated by jquery parts and angular parts
	 */
	var tabPage = {

	};
	tabPage.global = {
		jquery: function(){

			//TODO: this wont play well with angular, not sure why
			//maybe use this: http://dalelotts.github.io/angular-bootstrap-datetimepicker/ 
			$('.input-icon-calendar').datetimepicker({
				format: "LL"	
			}).on('dp.change', function(sd){
				$scope.$apply();
				console.log($(".input-icon-calendar").val());
				console.log("FDA", $scope.formData);
			});

			$("body").tooltip({ selector: '[data-toggle=tooltip]' });

			$.fn.select2.defaults.set("tokenSeparators", [","]);

			$(".select2-init-simple").select2();
			$(".select2-init-track").on("change", function(ev){
				$scope.$digest();
			});

		},
		angular: function() {
			$scope.init = function(viewBag) {
		
				var shopId = 1;
				var productId;

				var catReady = function(catId){
					console.log("Cat Ready", catId);
					AttributeSet.getByCategory(catId).then(function(data){
						$scope.availableAttributeSets = data;
					});
					//Load Global Cat
					GlobalCategory.getAll().then(function(data) {
						$scope.availableGlobalCategories = Category.transformNestedSetToUITree(data);
						$scope.formData.GlobalCategories[0] = Category.findByCatId(catId, $scope.availableGlobalCategories);
					});

				};

				console.log(viewBag);
				if("productId" in viewBag){
					productId = viewBag.productId;
					Product.getOne(productId).then(function(ivFormData){
						var gcat = ivFormData.GlobalCategory;
						console.log("formData^-1", ivFormData);
						$scope.formData = productProxy.inverseProductTransform(ivFormData);
						console.log("formData", $scope.formData);
						catReady(gcat);
					});	
				}	

				if("catId" in viewBag){
					var catId = viewBag.catId;
					catReady(catId);
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

			//TODO: Change _attrEnTh(t) to _attrEnTh(Name, t)
			$scope._attrEnTh = function(t){ return t.AttributeSetNameEn + " / " + t.AttributeSetNameTh; }
			$scope._isFreeTextInput = util.isFreeTextDataType;
			$scope._isListInput = util.isListDataType;
		}
	};
	tabPage.information = {
		jquery: function(){
			$(".select2-init-brand").select2({
				templateResult: function(d){
					if(!d || !d.BrandNameEn) return "Loading..";
					return d.BrandNameEn + " (" + d.BrandNameTh + ")";
				},
				templateSelection: function(d){
					if(d.BrandNameEn == undefined) return null;
					return d.BrandNameEn + " (" + d.BrandNameTh + ")";
				},
				ajax: {
					processResults: function (data) {
						var mapped = data.map(function(obj){
							obj.id = obj.BrandId;
							return obj;
						});

						console.log(mapped);
						return {results: mapped};
					},
					transport: function(params, success, failure){
						//Call Brand Service
						return Brand.getAll(params.data.q).then(success, failure);
					}
				}
			});
		},
		angular: function() {

		}
	};
	tabPage.images = {
		jquery: function() {

		},
		angular: function() {
			/**
			 * PRODUCT IMAGE
			 */
			$scope.uploader = ImageService.getUploader('/ProductImages');
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
				isListInput = ($scope._isListInput($scope.attributeOptions[index].attribute.Attribute.DataType));
			}

			//Reset Options
			$(".select2-init-" + index).select2({
				tags: !isListInput
			});

			$scope.attributeOptions[index].options = [];

		},
		jquery: function(){
			tabPage.variation.initSelect2(0);
			tabPage.variation.initSelect2(1);
		},
		angular: function() {
			//Unmultiplied Variants (factor)
			$scope.attributeOptions = {
				0: {
					attribute: false,
					options: []
				},
				1: {
					attribute: false,
					options: []
				}
			};


			$scope.$watch('attributeOptions[0].attribute', function(){
				tabPage.variation.initSelect2(0);
			});

			$scope.$watch('attributeOptions[1].attribute', function(){
				tabPage.variation.initSelect2(1);
			});

			/*
			 * Multiplying options into VariantPairs
			 */
			$scope.$watch('attributeOptions', function(){

				var variantHashes = {};
				//Product Hash Tracking Table
				$scope.formData.Variants.forEach(function(elem, index){
					//Keep track of the index of the hashed item
					variantHashes[elem.hash] = index;
				});

				//Multiply out unmultiplied options
				for(var aKey in $scope.attributeOptions[0].options){
					var A = $scope.attributeOptions[0].options[aKey];
					for(var bKey in $scope.attributeOptions[1].options){
						var B = $scope.attributeOptions[1].options[bKey];

						var kpair = new VariantPair({
							AttributeId: $scope.attributeOptions[0].attribute.AttributeId,
							ValueEn: A
						},{
							AttributeId: $scope.attributeOptions[1].attribute.AttributeId,
							ValueEn: B
						});

						//Only push if don't exist
						if(!(kpair.hash in variantHashes)){
							$scope.formData.Variants.push(kpair);
						}

						//Mark hash as used
						//This will not be deleted
						variantHashes[kpair.hash] = -1;
					}
				}

				//Remove deleted variants
				for(var rhash in variantHashes){
					if(variantHashes[rhash] == -1) continue;
					$scope.formData.Variants.splice(variantHashes[rhash], 1);
				}

				$scope.formData.DefaultVariant = $scope.formData.Variants[0];
			}, true);

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
			$(".select2-init-related").select2({
				tags: false,
				templateResult: function(d){
					if(!("ProductNameEn" in d)) return null;
					return d.ProductNameEn + " / " + d.ProductNameTh;
				},
				templateSelection: function(d){
					return d.ProductNameEn + " / " + d.ProductNameTh;
				},
				ajax: {
					processResults: function (data) {
						var mapped = data.data.map(function(obj){
							console.log(obj);
							obj.id = obj.ProductId;
							return obj;
						});

						return {results: mapped};
					},
					transport: function(params, success, failure){
						return Product.getAll({
							searchText: params.data.q
						}).then(success, failure);
					}
				}
			});

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

	//init global jquery
	$(document).on('ready',function(){
		tabPage.global.jquery();
		//init first page
		//TODO: This may not be information page
		//it depends on the link
		var pageId = 'information';
	    tabPage[pageId].jquery();
	    loadedTabs[pageId] = true;
	});

	//init tab jquery
	$(document).on('shown.bs.tab shown', function(tab){
		var pageId = tab.target.dataset.id;
		if(pageId in loadedTabs) return;
		console.log(tab, loadedTabs);
		console.log("initing ", pageId);
	    tabPage[pageId].jquery();
	    loadedTabs[pageId] = true;
	});

   	//Final saving
   	$scope.save = function() {
   		//TURN $scope.formData into api-able formats
   	}
}];
